'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectMindmapEdges, selectMindmapLoading, selectMindmapNodes, selectMindmapRawJson, selectMindmapSelectedNodeIds } from '@/redux/mindmapSelectors';
import { addNode, deleteSelectedNodes, setEdges, setNodes, } from '@/redux/slices/mindmapSlice';
import CommonButton from './ui/CummonButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { generateTypeBasedId } from '@/utils/mindmapUtils/mindmapCommonUtils.ts/mindmapCommonUtils';
import { useSelector } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { NODE_TYPES } from '@/types/mindmapData.types';
import { fetchMindmapFromGPT } from '@/api/prompts/buildMindmapPrompts';
import { fetchExplanationFromGPT } from '@/api/prompts/buildExplanationPrompt';
import { downloadCheatSheet } from '@/utils/pdfUtils/downloadCheatSheet';
import { extractCheatSheetDataFromRaw } from '@/utils/pdfUtils/extractCheatSheetData';
import { getLayoutedElements } from '@/utils/mindmapUtils/layoutDagre';

const Sidebar = () => {
  const [question, setQuestion] = useState('');
  const [mainPointCount, setMainPointCount] = useState(1);
  const [subPointCount, setSubPointCount] = useState(1);
    const [newNodeType, setNewNodeType] = useState('mainPointNode');
    const [explanation, setExplanation] = useState('');
const [explaining, setExplaining] = useState(false);


  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectMindmapLoading);
  const selectedNodeIds = useAppSelector(selectMindmapSelectedNodeIds);
      const nodes = useAppSelector(selectMindmapNodes);
const edges = useAppSelector(selectMindmapEdges);
const rawJson = useAppSelector(selectMindmapRawJson);




   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const canUndo = useSelector((state: any) => state.mindmap.past.length > 0);
   
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const canRedo = useSelector((state: any) => state.mindmap.future.length > 0);
  
const handleExplainSelectedNode = async () => {
  if (selectedNodeIds.length !== 1) return;

  const selectedId = selectedNodeIds[0];
  const node = nodes.find((n) => n.id === selectedId);
  if (!node) return;

  setExplaining(true);
  const explanation = await fetchExplanationFromGPT(node.data.label);
  setExplanation(explanation);
  setExplaining(false);
};



const handleDelete = () => {
  dispatch(deleteSelectedNodes()); // ← you can create this logic in slice/thunk or pass callback
};
  const handleGenerate = () => {
    dispatch(fetchMindmapFromGPT({ question, mainPointCount, subPointCount }));
  };

  const handleCreateNode = () => {
  const id = generateTypeBasedId(nodes, newNodeType);
  const newNode = {
    id,
    type: newNodeType,
    data: { label: 'New Node', type: newNodeType },
    position: { x: 500, y: 50 },
  };
  dispatch(addNode(newNode));
};

const handleDownloadCheatSheet = () => {
  const { question, answer, explanations } = extractCheatSheetDataFromRaw(rawJson);
  downloadCheatSheet({ question, answer, explanations });
};


const handleRelayout = () => {
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    nodes,
    edges,
  );
  dispatch(setNodes(layoutedNodes));
  dispatch(setEdges(layoutedEdges));
};

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: '#fff',
        p: 2,
        overflowY: 'auto',
        width: 300,
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      {/* Section: Question Details */}
      <Typography fontWeight={600} mb={1.5}>
        Question Details
      </Typography>

      <Typography fontSize={13} mb={0.5}>
        Main Exam Question
      </Typography>

      <TextField
        fullWidth
        placeholder="Enter the main exam question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        size="small"
        multiline
        minRows={2}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Main Points</InputLabel>
        <Select
          value={mainPointCount}
          label="Main Points"
          onChange={(e) => setMainPointCount(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <MenuItem key={num} value={num}>
              {num}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel>Subpoints</InputLabel>
        <Select
          value={subPointCount}
          label="Subpoints"
          onChange={(e) => setSubPointCount(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <MenuItem key={num} value={num}>
              {num}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <CommonButton
        disabled={loading || !question}
        onClick={handleGenerate}
        sx={{
          mb: 3,
          width: "100%"
        }}
      >
        {loading ? 'Generating...' : '🧠 Generate Mind Map'}
      </CommonButton>

 <CommonButton
    sx={{width:"100%" , my: "10px"}}
  startIcon={<DeleteOutlineIcon style={{fontSize:"16px"}} />}
  disabled={selectedNodeIds.length === 0}
  onClick={handleDelete}
>
  Delete {selectedNodeIds.length} Selected nodes
</CommonButton>

<Typography fontWeight={600} mb={1.5}>
  ➕ Create Node
</Typography>

<FormControl fullWidth size="small" sx={{ mb: 2 }}>
  <InputLabel>Node Type</InputLabel>
  <Select
    value={newNodeType}
    label="Node Type"
    onChange={(e) => setNewNodeType(e.target.value)}
  >
    {NODE_TYPES.map((type) => (
      <MenuItem key={type.value} value={type.value}>
        {type.label}
      </MenuItem>
    ))}
  </Select>
</FormControl>

<CommonButton
  onClick={handleCreateNode}
  sx={{ mb: 3, width: '100%' }}
  startIcon={<AddIcon />}
>
  Add New Node
</CommonButton>

 <Box display="flex" gap={1} my={2}>
      <CommonButton disabled={!canUndo} onClick={() => dispatch(UndoActionCreators.undo())}>
        Undo
      </CommonButton>
      <CommonButton disabled={!canRedo} onClick={() => dispatch(UndoActionCreators.redo())}>
        Redo
      </CommonButton>
    </Box>
       <CommonButton
  disabled={loading}
  onClick={handleRelayout}
  sx={{
    mb: 2,
    width: "100%"
  }}
>
 Re-Layout Mind Map
</CommonButton>

    {/* this is  */}

  <CommonButton
  sx={{ width: "100%", mb: 2 }}
  disabled={selectedNodeIds.length !== 1}
  onClick={handleExplainSelectedNode}
>
  {explaining ? 'Explaining...' : '💬 Explain Selected Node'}
</CommonButton>

{explanation && (
  <Box
    sx={{
      bgcolor: '#f1f1f1',
      p: 2,
      borderRadius: 1,
      fontSize: 13,
      whiteSpace: 'pre-line',
      mb: 2,
      maxHeight: 150,
      overflowY: 'auto',
    }}
  >
    {explanation}
  </Box>
)}


<CommonButton
  sx={{ width: "100%", mb: 2 }}
  disabled={!nodes.length}
  onClick={handleDownloadCheatSheet}
>
  📥 Download Cheatsheet
</CommonButton>

      <Divider sx={{ my: 2 }} />

      <Typography variant="caption" color="gray">
        Version 0.2.0
      </Typography>
    </Box>
  );
};

export default Sidebar;
