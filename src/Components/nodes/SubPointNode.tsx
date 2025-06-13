// src/components/nodes/SubPointNode.tsx
import React from 'react';
import { Handle, NodeProps, Position, Node } from '@xyflow/react';
import { Typography } from '@mui/material';
import { SubPointNodeData, ComponentType } from '@/types';
import NodeWrapper from '../NodeWrapper';

export default function SubPointNode({ data }: NodeProps<Node<SubPointNodeData>>) {
  if (!data.label) return null;

  return (
    <NodeWrapper
      sx={{
        borderColor: '#9e9e9e', // Material-UI grey
        backgroundColor: '#f5f5f5', // Light grey
        width: '220px', // Even smaller
      }}
    >
      <Typography variant="caption" sx={{ color: '#9e9e9e', fontWeight: 'bold', mb: 0.5 }}>
        {data.type === ComponentType.SubPoint ? 'SUB-POINT HEADING' : ''}
      </Typography>
      <Typography variant='body2'>
        {data.label}
      </Typography>

      {/* Handles: From Main Point (top), To Explanations (bottom) */}
      <Handle type="target" position={Position.Left} id="sub-point-from-main-point" />
      <Handle type="source" position={Position.Right} id="sub-point-to-explanation" />
    </NodeWrapper>
  );
}