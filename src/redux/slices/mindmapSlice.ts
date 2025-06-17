import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { parseJsonToNodesEdges } from '@/utils/mindmapUtils/transformJsonToFlow';
import { Node, Edge } from '@xyflow/react';
import { fetchStructuredAnswer } from '@/api/chatgpt';
import { Data } from '@/types/mindmapData.types';
import { getLayoutedElements } from '@/utils/mindmapUtils/layoutDagre';
import mockData from '../../app/Workflow/mockData.json'

interface MindmapState {
    question: string;
    rawJson: Data | null;
    nodes: Node[];
    edges: Edge[];
    loading: boolean;
    error?: string;
}

const initialState: MindmapState = {
    question: '',
    rawJson: null,
    nodes: [],
    edges: [],
    loading: false,
    error: undefined,
};

const USE_MOCK_DATA = true;


export const fetchMindmapFromGPT = createAsyncThunk(
  'mindmap/fetchFromGPT',
  async ({ question, mainPointCount, subPointCount }: { question: string; mainPointCount: number; subPointCount: number }) => {
  if (USE_MOCK_DATA) {
  return {
    question: mockData.question.label, // extract plain question
    data: mockData,                    // raw JSON object
  };
}
    const data = await fetchStructuredAnswer(question, mainPointCount, subPointCount);
    return { question, data };
  }
);

const mindmapSlice = createSlice({
    name: 'mindmap',
    initialState,
   reducers: {
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
}
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

export default mindmapSlice.reducer;
export const { updateNodeLabel } = mindmapSlice.actions;
