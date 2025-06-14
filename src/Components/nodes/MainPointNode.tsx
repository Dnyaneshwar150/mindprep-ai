// src/components/nodes/MainPointNode.tsx
import React, { useState } from 'react';
import { Handle, NodeProps, Position, Node } from '@xyflow/react';
import { Box, IconButton, Typography } from '@mui/material';
import { MainPointNodeData } from '@/types';
import NodeWrapper from '../NodeWrapper';
import CustomTooltip from '../Common/CustomTooltip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function MainPointNode({ data }: NodeProps<Node<MainPointNodeData>>) {
    const [expanded, setExpanded] = useState(false);
  
  if (!data.label) return null;

  return (
    <NodeWrapper
      sx={{
        borderColor: 'var(--border-blue)', // Material-UI blue
        backgroundColor: 'var(--background-blue)',
        width:"300px", // Smaller
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start' ,padding:"8px" }}>
  <Typography
    sx={{
      fontSize:"18px",
      flex: 1,
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