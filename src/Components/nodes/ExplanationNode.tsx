// src/components/nodes/ExplanationNode.tsx
import React, { useState } from 'react';
import { Handle, NodeProps, Position, Node } from '@xyflow/react';
import { Typography, Box } from '@mui/material'; // Import Link for source
import { ExplanationNodeData } from '@/types';
import NodeWrapper from '../NodeWrapper';
import CustomTooltip from '../Common/CustomTooltip';
import { IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
  


export default function ExplanationNode({ data }: NodeProps<Node<ExplanationNodeData>>) {
      const [expanded, setExpanded] = useState(false);
  
  if (!data.label) return null;

  return (
    <NodeWrapper
      sx={{
        borderColor: '#795548', // Material-UI brown
        backgroundColor: '#efebe9', // Light brown
        width: '200px', // Smallest
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

      {/* Handles: Only target handle (from SubPoint) */}
      <Handle type="target" position={Position.Left} id="explanation-from-sub-point" />
    </NodeWrapper>
  );
}