import React, { useState } from 'react';
import { Handle, NodeProps, Position, Node } from '@xyflow/react';
import { Typography, IconButton, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import NodeWrapper from '../NodeWrapper';
import CustomTooltip from '../../ui/CustomTooltip';
import { AnswerNodeData } from '@/types/mindmap.types';

export default function AnswerNode({ data }: NodeProps<Node<AnswerNodeData>>) {
  const [expanded, setExpanded] = useState(false);

  if (!data.label) return null;

  return (
    <NodeWrapper
      sx={{
        borderColor: 'var(--border-green)',
        backgroundColor: 'var(--background-green)',
        width: '280px',
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

      <Handle type="target" position={Position.Left} id="answer-from-question" />
      <Handle type="source" position={Position.Right} id="answer-to-main-point-heading" />
    </NodeWrapper>
  );
}
