// src/components/nodes/ExplanationNode.tsx
import React from 'react';
import { Handle, NodeProps, Position, Node } from '@xyflow/react';
import { Typography, Link } from '@mui/material'; // Import Link for source
import { ExplanationNodeData, ComponentType } from '@/types';
import NodeWrapper from '../NodeWrapper';

export default function ExplanationNode({ data }: NodeProps<Node<ExplanationNodeData>>) {
  if (!data.label) return null;

  return (
    <NodeWrapper
      sx={{
        borderColor: '#795548', // Material-UI brown
        backgroundColor: '#efebe9', // Light brown
        width: '200px', // Smallest
      }}
    >
      <Typography variant="caption" sx={{ color: '#795548', fontWeight: 'bold', mb: 0.5 }}>
        {data.type === ComponentType.Explanation ? ' SUBPOINT EXPLANATION ' : ''}
      </Typography>
      <Typography variant='body2'>
        {data.label}
      </Typography>
      {data.source && (
        <Link href={data.source} target="_blank" rel="noopener" variant="caption" mt={1}>
          Source
        </Link>
      )}

      {/* Handles: Only target handle (from SubPoint) */}
      <Handle type="target" position={Position.Top} id="explanation-from-sub-point" />
    </NodeWrapper>
  );
}