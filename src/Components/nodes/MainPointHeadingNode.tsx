// src/components/nodes/MainPointHeadingNode.tsx
import React from 'react';
import { Handle, NodeProps, Position, Node } from '@xyflow/react';
import { Typography, IconButton, Box, Tooltip } from '@mui/material';
import { ExpandMore, ExpandLess, Visibility, VisibilityOff } from '@mui/icons-material';
import { MainPointHeadingNodeData, ComponentType } from '@/types';
import NodeWrapper from '../NodeWrapper';

export default function MainPointHeadingNode({ data }: NodeProps<Node<MainPointHeadingNodeData>>) {
  if (!data.label) return null;

  const handleToggleContent = () => {
    data.onToggleContentExpand?.(data.nodeId);
  };

  const handleToggleChildren = () => {
    data.onToggleChildrenVisibility?.(data.nodeId);
  };

  return (
    <NodeWrapper
      sx={{
        borderColor: '#ff9800',
        backgroundColor: '#fff3e0',
        width: '260px',
      }}
    >
      {/* Header with buttons */}
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
        <Typography variant="caption" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
          {data.type === ComponentType.MainPointHeading ? 'MAIN POINT HEADING' : ''}
        </Typography>

        <Box display="flex" gap={1}>
          <Tooltip title="Toggle content">
            <IconButton size="small" onClick={handleToggleContent}>
              {data.isExpanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Show/Hide Children">
            <IconButton size="small" onClick={handleToggleChildren}>
              {data.areChildrenVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Label content - shown only if expanded */}
      {data.isExpanded && (
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 1 }}>
          {data.label}
        </Typography>
      )}

      <Handle type="target" position={Position.Left} id="heading-from-answer" />
      <Handle type="source" position={Position.Right} id="heading-to-main-point" />
    </NodeWrapper>
  );
}
