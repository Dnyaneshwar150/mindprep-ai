// src/components/nodes/MainPointHeadingNode.tsx
import React, { useState } from 'react';
import { Handle, NodeProps, Position, Node } from '@xyflow/react';
import { Typography, IconButton, Box } from '@mui/material';
import { ExpandMore, ExpandLess, Visibility, VisibilityOff } from '@mui/icons-material';
import { MainPointHeadingNodeData } from '@/types';
import NodeWrapper from '../NodeWrapper';
import CustomTooltip from '../Common/CustomTooltip';

export default function MainPointHeadingNode({ data }: NodeProps<Node<MainPointHeadingNodeData>>) {
   const [expanded, setExpanded] = useState(false);
  if (!data.label) return null;
  const handleToggleChildren = () => {
    data.onToggleChildrenVisibility?.(data.nodeId);
  };
   const handleToggleExpand = () => {
    setExpanded(prev => !prev);
  };


  return (
      <NodeWrapper
      sx={{
        borderColor: 'var(--border-orange)',
        backgroundColor: 'var(--background-orange)',
        width: '300px',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" padding={"4px"}>
<Typography
        sx={{
          fontSize: '18px',
          fontWeight:"bold",
          mt: 1,
          overflow: expanded ? 'visible' : 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: expanded ? 'unset' : 1,
          WebkitBoxOrient: 'vertical',
          whiteSpace: expanded ? 'normal' : 'nowrap',
          wordBreak: 'break-word',
        }}
      >
        {data.label}
      </Typography>
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
