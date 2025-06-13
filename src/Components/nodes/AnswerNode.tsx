// src/components/nodes/AnswerNode.tsx
import React from 'react';
import { Handle, NodeProps, Position, Node } from '@xyflow/react';
import { Typography } from '@mui/material';
import { AnswerNodeData, ComponentType } from '@/types';
import NodeWrapper from '../NodeWrapper';

export default function AnswerNode({ data }: NodeProps<Node<AnswerNodeData>>) {
  if (!data.label) return null;

  return (
    <NodeWrapper
      sx={{
        borderColor: '#4caf50',
        backgroundColor: '#e8f5e9',
        width: '280px', // Consistent width
      }}
    >
      <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 'bold', mb: 0.5 }}>
        {data.type === ComponentType.Answer ? `ANSWER ${data.score !== undefined ? `(Score: ${data.score})` : ''}` : ''}
      </Typography>
      <Typography variant='body1'>
        {data.label}
      </Typography>

      {/* Handles: Answer connects FROM question (top) and TO main point headings (bottom) */}
      <Handle type="target" position={Position.Left} id="answer-from-question" />
      <Handle type="source" position={Position.Right} id="answer-to-main-point-heading" />
    </NodeWrapper>
  );
}