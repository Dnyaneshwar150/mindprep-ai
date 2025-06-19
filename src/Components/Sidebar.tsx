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
import { selectMindmapLoading, selectMindmapNodes } from '@/redux/mindmapSelectors';
import { addNode, deleteSelectedNodes, fetchMindmapFromGPT } from '@/redux/slices/mindmapSlice';
import CommonButton from './ui/CummonButton';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { generateTypeBasedId } from '@/utils/mindmapUtils/mindmapCommonUtils.ts/mindmapCommonUtils';
// import { NODE_TYPES } from '@/types/mindmapData.types';

const NODE_TYPES = [
  { label: 'Question', value: 'questionNode' },
  { label: 'Answer', value: 'answerNode' },
  { label: 'Main Point Heading', value: 'mainPointHeadingNode' },
  { label: 'Main Point', value: 'mainPointNode' },
  { label: 'Sub Point', value: 'subPointNode' },
  { label: 'Explanation', value: 'explanationNode' },
];

const Sidebar = () => {
  const [question, setQuestion] = useState('');
  const [mainPointCount, setMainPointCount] = useState(1);
  const [subPointCount, setSubPointCount] = useState(1);
    const [newNodeType, setNewNodeType] = useState('mainPointNode');


  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectMindmapLoading);
  const selectedNodeIds = useAppSelector(state => state.mindmap.selectedNodeIds);
    const nodes = useAppSelector(selectMindmapNodes);



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

      {/* Section: Edit Nodes */}
      {/* <Typography fontWeight={600} mb={1}>
        📝 Edit Nodes
      </Typography>

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Select Node</InputLabel>
        <Select value={1} label="Select Node">
          <MenuItem value={1}>Main Exam Question</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Heading"
        size="small"
        placeholder="Node heading..."
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Explanation"
        size="small"
        placeholder="Node explanation..."
        multiline
        minRows={2}
        sx={{ mb: 2 }}
      />

      <Box display="flex" gap={1} mb={3}>
        <CommonButton
          sx={{ width: "50%" }}
          startIcon={<AddIcon />}
        >
          Add Child
        </CommonButton>
       <CommonButton 
  sx={{ width: "50%" }}
  startIcon={<EditIcon style={{fontSize:"16px"}} />}
>
  Update
</CommonButton>
      </Box> */}

      {/* Section: Appearance */}
      {/* <Typography fontWeight={600} mb={1}>
        🎨 Appearance
      </Typography>

      <Typography fontSize={13} mb={1}>
        Layout Style
      </Typography>

      <Box display="flex" gap={1} mb={2}>
        <Button variant="outlined" sx={{ textTransform: 'none', flex: 1 }}>
          Hierarchy
        </Button>
        <Button variant="outlined" sx={{ textTransform: 'none', flex: 1 }}>
          Radial
        </Button>
        <Button variant="outlined" sx={{ textTransform: 'none', flex: 1 }}>
          Timeline
        </Button>
      </Box>

      <Typography fontSize={13} mb={1}>
        Color Theme
      </Typography> */}

      {/* <Box display="flex" gap={1} mb={3}>
        {['#4285F4', '#DB4437', '#F4B400', '#0F9D58', '#FF6D01', '#AB47BC'].map(
          (color, i) => (
            <Box
              key={i}
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: color,
                cursor: 'pointer',
              }}
            />
          )
        )}
      </Box> */}

    <CommonButton
    sx={{width:"100%"}}
  startIcon={<DownloadIcon style={{fontSize:"16px"}} />}
>
  Export Mind Map
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

      <Divider sx={{ my: 2 }} />

      <Typography variant="caption" color="gray">
        Version 0.2.0
      </Typography>
    </Box>
  );
};

export default Sidebar;
