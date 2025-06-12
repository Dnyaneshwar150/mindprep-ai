// src/components/nodes/NodeWrapper.tsx
import React from 'react';
import { Paper, PaperProps } from '@mui/material';

interface NodeWrapperProps extends PaperProps {
  children: React.ReactNode;
}

const NodeWrapper: React.FC<NodeWrapperProps> = ({ children, sx, ...rest }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'relative',
        border: '1px solid #ccc',
        width: '280px', // Slightly wider for more content
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '15px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        textAlign: 'left',
        minHeight: '50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Paper>
  );
};

export default NodeWrapper;