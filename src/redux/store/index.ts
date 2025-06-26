// store/index.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { mindmapReducer, resetMindmap } from "../slices/mindmapSlice";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import undoable, { excludeAction } from "redux-undo";
import { fetchMindmapFromGPT } from "@/api/prompts/buildMindmapPrompts";

// SSR-safe storage
const createNoopStorage = () => ({
  getItem: async () => null,
  setItem: async (_key: string, value: unknown) => value,
  removeItem: async () => {},
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const mindmapUndoable = undoable(mindmapReducer, {
  filter: excludeAction([
    fetchMindmapFromGPT.pending.type,
    fetchMindmapFromGPT.fulfilled.type,
    fetchMindmapFromGPT.rejected.type,
    resetMindmap.type,
  ]),
});

// persist config for mindmap
const mindmapPersistConfig = {
  key: "mindmap",
  storage,
  whitelist: ["present"], // persist only the present state (undoable)
};

// combine reducers
const rootReducer = combineReducers({
  mindmap: persistReducer(mindmapPersistConfig, mindmapUndoable),
});

// configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
