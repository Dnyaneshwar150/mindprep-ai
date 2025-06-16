'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectMindmapLoading, selectMindmapNodes } from '@/redux/mindmapSelectors';
import { fetchMindmapFromGPT } from '@/redux/slices/mindmapSlice';

const Sidebar = () => {


  const [question, setQuestion] = useState('');
  const [mainPointCount, setMainPointCount] = useState(1);
  const [subPointCount, setSubPointCount] = useState(1);

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectMindmapLoading);

const handleGenerate = () => {
  dispatch(fetchMindmapFromGPT({ question, mainPointCount, subPointCount }));
};

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: 'var(--light-grey)',
        borderRight: '1px solid #ccc',
        p: '16px',
        overflowY: 'auto',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Typography sx={{ fontWeight: 600, mb: 2, fontSize: '16px' }}>
        Create Question Flow
      </Typography>

      <TextField
        fullWidth
        size="small"
        label="Question"
        variant="outlined"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Main Points</InputLabel>
        <Select
          value={mainPointCount}
          label="Main Points"
          onChange={(e) => setMainPointCount(Number(e.target.value))}
        >
          {[1, 2, 3, 4].map((num) => (
            <MenuItem key={num} value={num}>
              {num}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Subpoints</InputLabel>
        <Select
          value={subPointCount}
          label="Subpoints"
          onChange={(e) => setSubPointCount(Number(e.target.value))}
        >
          {[1, 2, 3, 4].map((num) => (
            <MenuItem key={num} value={num}>
              {num}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        fullWidth
        onClick={handleGenerate}
        disabled={loading || !question}
        sx={{
          backgroundColor: 'var(--primary-grey)',
          borderRadius: '12px',
          textTransform: 'none',
          mb: 3,
          '&:hover': {
            backgroundColor: '#888',
          },
        }}
      >
        {loading ? 'Generating...' : 'Generate'}
      </Button>

      <Grid sx={{ fontSize: 12, color: 'var(--primary-grey)' }}>
        Version 0.1.0
      </Grid>
    </Box>
  );
};

export default Sidebar;
