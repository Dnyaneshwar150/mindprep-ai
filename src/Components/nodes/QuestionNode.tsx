// src/components/nodes/QuestionNode.tsx
import React from 'react';
import { Handle, NodeProps, Position, Node } from '@xyflow/react';
import { Typography } from '@mui/material';
import { QuestionNodeData, ComponentType } from '@/types';
import NodeWrapper from '../NodeWrapper';

export default function QuestionNode({ data }: NodeProps<Node<QuestionNodeData>>) {
  if (!data.label) return null;

  return (
    <NodeWrapper
      sx={{
        borderColor: '#1976d2',
        backgroundColor: '#e3f2fd',
        textAlign: 'center',
        width: '300px', // Wider for questions
      }}
    >
      <Typography variant="caption" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 0.5 }}>
        {data.type === ComponentType.Question ? 'QUESTION' : ''}
      </Typography>
      <Typography variant='h6' sx={{ fontWeight: 'medium' }}>
        {data.label}
      </Typography>
      <Handle type="source" position={Position.Right} id="question-answer-handle" />
    </NodeWrapper>
  );
}