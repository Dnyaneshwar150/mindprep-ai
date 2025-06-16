// src/components/nodes/SubPointNode.tsx
import React, { useState } from 'react';
import { Handle, NodeProps, Position, Node } from '@xyflow/react';
import { Box, IconButton, Typography } from '@mui/material';
import { SubPointNodeData } from '@/types';
import NodeWrapper from '../NodeWrapper';
import CustomTooltip from '../../ui/CustomTooltip';
import { ExpandLess, ExpandMore, Visibility, VisibilityOff } from '@mui/icons-material';

export default function SubPointNode({ data }: NodeProps<Node<SubPointNodeData>>) {
     const [expanded, setExpanded] = useState(false);
  
  if (!data.label) return null;

  const handleToggleChildren = () => {
    data.onToggleChildrenVisibility?.(data.nodeId);
  };

  return (
    <NodeWrapper
      sx={{
       borderColor: 'var(--border-grey)',
        backgroundColor: 'var(--background-grey)',
        width: '220px', // Even smaller
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
            <IconButton size="large"onClick={() => setExpanded(!expanded)}>
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

      {/* Handles: From Main Point (top), To Explanations (bottom) */}
      <Handle type="target" position={Position.Left} id="sub-point-from-main-point" />
      <Handle type="source" position={Position.Right} id="sub-point-to-explanation" />
    </NodeWrapper>
  );
}