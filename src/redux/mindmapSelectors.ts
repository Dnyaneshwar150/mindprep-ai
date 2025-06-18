import { RootState } from "./store";

export const selectMindmapNodes = (state: RootState) => state.mindmap.nodes;
export const selectMindmapEdges = (state: RootState) => state.mindmap.edges;
export const selectMindmapLoading = (state: RootState) => state.mindmap.loading;
export const selectMindmapQuestion = (state: RootState) => state.mindmap.question;
export const selectMindmapSelectedNodeIds = (state: RootState) =>  state.mindmap.selectedNodeIds;