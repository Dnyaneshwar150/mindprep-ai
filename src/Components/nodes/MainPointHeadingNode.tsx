// src/components/nodes/MainPointHeadingNode.tsx
import React from 'react';
import { Handle, NodeProps, Position, Node } from '@xyflow/react';
import { Typography } from '@mui/material';
import { MainPointHeadingNodeData, ComponentType } from '@/types';
import NodeWrapper from '../NodeWrapper';

export default function MainPointHeadingNode({ data }: NodeProps<Node<MainPointHeadingNodeData>>) {
  if (!data.label) return null;

  return (
    <NodeWrapper
      sx={{
        borderColor: '#ff9800', // Material-UI orange for headings
        backgroundColor: '#fff3e0', // Light orange background
        width: '260px', // Slightly smaller
      }}
    >
      <Typography variant="caption" sx={{ color: '#ff9800', fontWeight: 'bold', mb: 0.5 }}>
        {data.type === ComponentType.MainPointHeading ? 'MAIN POINT HEADING' : ''}
      </Typography>
      <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
        {data.label}
      </Typography>

      {/* Handles: From Answer (top), To Main Points (bottom) */}
      <Handle type="target" position={Position.Top} id="heading-from-answer" />
      <Handle type="source" position={Position.Bottom} id="heading-to-main-point" />
    </NodeWrapper>
  );
}