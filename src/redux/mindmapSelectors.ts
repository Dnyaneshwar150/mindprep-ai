import { RootState } from "./store";

export const selectMindmapPresent = (state: RootState) => state.mindmap.present;

export const selectMindmapNodes = (state: RootState) =>
  state.mindmap.present.nodes;

export const selectMindmapEdges = (state: RootState) =>
  state.mindmap.present.edges;

export const selectMindmapLoading = (state: RootState) =>
  state.mindmap.present.loading;

export const selectMindmapQuestion = (state: RootState) =>
  state.mindmap.present.question;

export const selectMindmapSelectedNodeIds = (state: RootState) =>
  state.mindmap.present.selectedNodeIds;

export const selectMindmapRawJson = (state: RootState) =>
  state.mindmap.present.rawJson;


