// src/components/nodes/QuestionNode.tsx
import React from 'react';
import { Handle, NodeProps, Position, Node } from '@xyflow/react';
import { Grid, Typography } from '@mui/material';
import { QuestionNodeData } from '@/types';
import NodeWrapper from '../NodeWrapper';
import CustomTooltip from '../../ui/CustomTooltip';

export default function QuestionNode({ data }: NodeProps<Node<QuestionNodeData>>) {
  if (!data.label) return null;

  return (
    <NodeWrapper
      sx={{
       borderColor: 'var(--border-red)',
        backgroundColor: 'var(--background-red)',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {data.label.length > 25 ? (
        <CustomTooltip title={data.label} arrow placement="top" sx={{backgroundColor:"var(--black)",color:"#ffffff", borderRadius:"16px"}}>
        <Grid
          sx={{
            padding: "10px",
            maxWidth: '300px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'medium', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {data.label}
          </Typography>
          <Handle type="source" position={Position.Right} id="question-answer-handle" />
        </Grid>
      </CustomTooltip>) : 
      (<Grid
          sx={{
            padding: "10px",
            maxWidth: '300px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'medium', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {data.label}
          </Typography>
          <Handle type="source" position={Position.Right} id="question-answer-handle" />
        </Grid>)  }
   
    </NodeWrapper>
  );
}