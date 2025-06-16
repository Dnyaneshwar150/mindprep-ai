import { configureStore } from '@reduxjs/toolkit';
import mindmapReducer from '../slices/mindmapSlice'

export const store = configureStore({
  reducer: {
    mindmap: mindmapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;