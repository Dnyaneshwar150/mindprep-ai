import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { parseJsonToNodesEdges } from '@/utils/mindmapUtils/transformJsonToFlow';
import { Node, Edge } from '@xyflow/react';
import { fetchStructuredAnswer } from '@/api/chatgpt';
import { Data } from '@/types/mindmapData.types';
import { getLayoutedElements } from '@/utils/mindmapUtils/layoutDagre';

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

export const fetchMindmapFromGPT = createAsyncThunk(
  'mindmap/fetchFromGPT',
  async ({ question, mainPointCount, subPointCount }: { question: string; mainPointCount: number; subPointCount: number }) => {
    const data = await fetchStructuredAnswer(question, mainPointCount, subPointCount);
    return { question, data };
  }
);

const mindmapSlice = createSlice({
    name: 'mindmap',
    initialState,
    reducers: {},
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