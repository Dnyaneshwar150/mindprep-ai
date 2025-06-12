// src/components/nodes/MainPointNode.tsx
import React from 'react';
import { Handle, NodeProps, Position, Node } from '@xyflow/react';
import { Typography } from '@mui/material';
import { MainPointNodeData, ComponentType } from '@/types';
import NodeWrapper from '../NodeWrapper';

export default function MainPointNode({ data }: NodeProps<Node<MainPointNodeData>>) {
  if (!data.label) return null;

  return (
    <NodeWrapper
      sx={{
        borderColor: '#2196f3', // Material-UI blue
        backgroundColor: '#e3f2fd', // Light blue
        width: '240px', // Smaller
      }}
    >
      <Typography variant="caption" sx={{ color: '#2196f3', fontWeight: 'bold', mb: 0.5 }}>
        {data.type === ComponentType.MainPoint ? 'MAIN POINT EXPLANATION' : ''}
      </Typography>
      <Typography variant='body2'>
        {data.label}
      </Typography>

      {/* Handles: From Heading (top), To SubPoints (bottom) */}
      <Handle type="target" position={Position.Top} id="main-point-from-heading" />
      <Handle type="source" position={Position.Bottom} id="main-point-to-sub-point" />
    </NodeWrapper>
  );
}