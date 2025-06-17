import React, { useState } from 'react';
import { Handle, NodeProps, Position, Node } from '@xyflow/react';
import { Box, IconButton, Typography, TextField } from '@mui/material';
import NodeWrapper from '../NodeWrapper';
import CustomTooltip from '../../ui/CustomTooltip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { MainPointNodeData } from '@/types/mindmap.types';
import { updateNodeLabel } from '@/redux/slices/mindmapSlice';
import { useAppDispatch } from '@/hooks/reduxHooks';

export default function MainPointNode({ data, id }: NodeProps<Node<MainPointNodeData>>) {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(data.label);
  const dispatch = useAppDispatch();

  if (!data.label) return null;

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (inputValue !== data.label) {
      dispatch(updateNodeLabel({ nodeId: id, newLabel: inputValue }));
    }
    setIsEditing(false);
  };

  return (
    <NodeWrapper
      sx={{
        borderColor: 'var(--border-blue)',
        backgroundColor: 'var(--background-blue)',
        width: '300px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', padding: '8px' }}>
        {isEditing ? (
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            variant="standard"
            fullWidth
            inputProps={{ style: { fontSize: '18px' } }}
          />
        ) : (
          <Typography
            sx={{
              fontSize: '18px',
              flex: 1,
              overflow: expanded ? 'visible' : 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: expanded ? 'unset' : 1,
              WebkitBoxOrient: 'vertical',
              whiteSpace: expanded ? 'normal' : 'nowrap',
              wordBreak: 'break-word',
            }}
            onDoubleClick={handleDoubleClick}
          >
            {data.label}
          </Typography>
        )}

        <CustomTooltip title={expanded ? 'Collapse' : 'Expand'}>
          <IconButton
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={{ ml: 1, alignSelf: 'center', padding: '2px' }}
          >
            {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </IconButton>
        </CustomTooltip>
      </Box>

      {/* Handles: From Heading (top), To SubPoints (bottom) */}
      <Handle type="target" position={Position.Left} id="main-point-from-heading" />
      <Handle type="source" position={Position.Right} id="main-point-to-sub-point" />
    </NodeWrapper>
  );
}
