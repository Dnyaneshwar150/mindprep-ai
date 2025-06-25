import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { parseJsonToNodesEdges } from "@/utils/mindmapUtils/transformJsonToFlow";
import { Node, Edge } from "@xyflow/react";
import { Data } from "@/types/mindmapData.types";
import { getLayoutedElements } from "@/utils/mindmapUtils/layoutDagre";
import undoable from "redux-undo";
import { fetchMindmapFromGPT } from "@/api/prompts/buildMindmapPrompts";

interface MindmapState {
  question: string;
  rawJson: Data | null;
  nodes: Node[];
  edges: Edge[];
  loading: boolean;
  error?: string;
  selectedNodeIds: string[];
  mindMapPresent: boolean;
}

const initialState: MindmapState = {
  question: "",
  rawJson: null,
  nodes: [],
  edges: [],
  loading: false,
  error: undefined,
  selectedNodeIds: [],
  mindMapPresent: false,
};

const mindmapSlice = createSlice({
  name: "mindmap",
  initialState,
  reducers: {
    setNodes(state, action: PayloadAction<Node[]>) {
      state.nodes = JSON.parse(JSON.stringify(action.payload));
    },
    setEdges(state, action: PayloadAction<Edge[]>) {
      state.edges = action.payload;
    },
    addNode(state, action: PayloadAction<Node>) {
      const clonedNode = JSON.parse(JSON.stringify(action.payload));
      state.nodes.push(clonedNode);
    },
    setSelectedNodeIds(state, action: PayloadAction<string[]>) {
      state.selectedNodeIds = action.payload;
    },
    toggleNodeSelection(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.selectedNodeIds.indexOf(id);
      if (index >= 0) {
        state.selectedNodeIds.splice(index, 1); // Deselect
      } else {
        state.selectedNodeIds.push(id); // Select
      }
    },
    clearSelectedNodeIds(state) {
      state.selectedNodeIds = [];
    },
    deleteSelectedNodes(state) {
      const nodeIdsToDelete = new Set(state.selectedNodeIds);

      const collectChildren = (parentIds: Set<string>) => {
        let added = false;

        state.edges.forEach((edge) => {
          if (parentIds.has(edge.source) && !nodeIdsToDelete.has(edge.target)) {
            nodeIdsToDelete.add(edge.target);
            added = true;
          }
        });

        // Keep recursing until no new children are found
        if (added) {
          collectChildren(nodeIdsToDelete);
        }
      };

      // Step 1: Collect all children recursively
      collectChildren(nodeIdsToDelete);

      // Step 2: Delete nodes
      state.nodes = state.nodes.filter((node) => !nodeIdsToDelete.has(node.id));

      // Step 3: Optionally delete edges pointing to deleted nodes
      state.edges = state.edges.filter(
        (edge) =>
          !nodeIdsToDelete.has(edge.source) &&
          !nodeIdsToDelete.has(edge.target),
      );

      // Step 4: Clear selection
      state.selectedNodeIds = [];
    },
    updateNodeLabel: (
      state,
      action: {
        payload: { nodeId: string; newLabel: string };
        type: string;
      },
    ) => {
      const { nodeId, newLabel } = action.payload;
      const node = state.nodes.find((n) => n.id === nodeId);
      if (node) {
        node.data = {
          ...node.data,
          label: newLabel,
        };
      }
    },
    resetMindmap() {
      return {
        ...initialState,
        mindMapPresent: false,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMindmapFromGPT.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchMindmapFromGPT.fulfilled, (state, action) => {
        const { nodes: rawnodes, edges: rawedges } = parseJsonToNodesEdges(
          action.payload.data,
        );
        const { nodes, edges } = getLayoutedElements(rawnodes, rawedges);
        return {
          ...state,
          loading: false,
          question: action.payload.question,
          rawJson: action.payload.data,
          nodes,
          edges,
          mindMapPresent: true,
        };
      })
      .addCase(fetchMindmapFromGPT.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to generate mindmap";
      });
  },
});

export default undoable(mindmapSlice.reducer);
export const {
  addNode,
  setEdges,
  setNodes,
  setSelectedNodeIds,
  toggleNodeSelection,
  clearSelectedNodeIds,
  deleteSelectedNodes,
  updateNodeLabel,
  resetMindmap,
} = mindmapSlice.actions;
