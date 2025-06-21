import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { parseJsonToNodesEdges } from '@/utils/mindmapUtils/transformJsonToFlow';
import { Node, Edge } from '@xyflow/react';
import { Data } from '@/types/mindmapData.types';
import { getLayoutedElements } from '@/utils/mindmapUtils/layoutDagre';
import undoable from 'redux-undo';
import { fetchMindmapFromGPT } from '@/api/prompts/buildMindmapPrompts';


interface MindmapState {
    question: string;
    rawJson: Data | null;
    nodes: Node[];
    edges: Edge[];
    loading: boolean;
    error?: string;
      selectedNodeIds: string[]; 

}

const initialState: MindmapState = {
    question: '',
    rawJson: null,
    nodes: [],
    edges: [],
    loading: false,
    error: undefined,
    selectedNodeIds: [],
};


const mindmapSlice = createSlice({
    name: 'mindmap',
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
      state.nodes = state.nodes.filter(
        (n) => !state.selectedNodeIds.includes(n.id)
      );
      state.selectedNodeIds = [];
    },
 updateNodeLabel: (
  state,
  action: {
    payload: { nodeId: string; newLabel: string };
    type: string;
  }
) => {
  const { nodeId, newLabel } = action.payload;
  const node = state.nodes.find((n) => n.id === nodeId);
  if (node) {
    node.data = {
      ...node.data,
      label: newLabel,
    };
  }
} ,
},

    extraReducers: builder => {
        builder
            .addCase(fetchMindmapFromGPT.pending, state => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchMindmapFromGPT.fulfilled, (state, action) => {
                const { nodes:rawnodes, edges:rawedges } = parseJsonToNodesEdges(action.payload.data);
                  const { nodes, edges } = getLayoutedElements(rawnodes, rawedges);
                return {
                    ...state,
                    loading: false,
                    question: action.payload.question,
                    rawJson: action.payload.data,
                    nodes,
                    edges,
                };
            })
            .addCase(fetchMindmapFromGPT.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to generate mindmap';
            });
    },
});

export default undoable(mindmapSlice.reducer);
export const {
  addNode,setEdges,setNodes,
  setSelectedNodeIds,
  toggleNodeSelection,
  clearSelectedNodeIds,
  deleteSelectedNodes,
  updateNodeLabel,
} = mindmapSlice.actions;