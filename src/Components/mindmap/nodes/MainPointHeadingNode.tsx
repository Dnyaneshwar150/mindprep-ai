import React, { useState } from 'react';
import { Handle, NodeProps, Position, Node } from '@xyflow/react';
import { Typography, IconButton, Box, TextField } from '@mui/material';
import { ExpandMore, ExpandLess, Visibility, VisibilityOff } from '@mui/icons-material';
import NodeWrapper from '../NodeWrapper';
import CustomTooltip from '../../ui/CustomTooltip';
import { MainPointHeadingNodeData } from '@/types/mindmap.types';
import { updateNodeLabel } from '@/redux/slices/mindmapSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectMindmapSelectedNodeIds } from '@/redux/mindmapSelectors';

export default function MainPointHeadingNode({ data, id }: NodeProps<Node<MainPointHeadingNodeData>>) {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(data.label);
  const dispatch = useAppDispatch();
  
  const selectedNodeIds = useAppSelector(selectMindmapSelectedNodeIds);
  const isSelected = selectedNodeIds.includes(id); 

  if (!data.label) return null;

  const handleToggleChildren = () => {
    data.onToggleChildrenVisibility?.(data.nodeId);
  };

  const handleToggleExpand = () => {
    setExpanded(prev => !prev);
  };

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
        borderColor: isSelected ? 'var(--primary-black)':  'var(--border-orange)',
        backgroundColor: isSelected ? 'var(--border-red)' : 'var(--background-orange)',
        width: '300px',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" padding={"4px"}>
        {isEditing ? (
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            variant="standard"
            fullWidth
            inputProps={{ style: { fontSize: '18px', fontWeight: 'bold' } }}
          />
        ) : (
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: "bold",
              mt: 1,
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

        <Box display="flex" alignItems="center" gap={0.5}>
          <CustomTooltip title={expanded ? 'Collapse' : 'Expand'}>
            <IconButton size="large" onClick={handleToggleExpand}>
              {expanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
            </IconButton>
          </CustomTooltip>

          <CustomTooltip title="Show/Hide Children">
            <IconButton size="large" onClick={handleToggleChildren}>
              {data.areChildrenVisible ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </IconButton>
          </CustomTooltip>
        </Box>
      </Box>

      <Handle type="target" position={Position.Left} id="heading-from-answer" />
      <Handle type="source" position={Position.Right} id="heading-to-main-point" />
    </NodeWrapper>
  );
}
