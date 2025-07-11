// src/components/nodes/NodeWrapper.tsx
import React from "react";
import { Paper, PaperProps } from "@mui/material";

interface NodeWrapperProps extends PaperProps {
  children: React.ReactNode;
}

const NodeWrapper: React.FC<NodeWrapperProps> = ({ children, sx, ...rest }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: "relative",
        backgroundColor: "#fff",
        borderRadius: "18px",
        padding: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        textAlign: "left",
        minHeight: "50px",
        minWidth: "300px",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Paper>
  );
};

export default NodeWrapper;
