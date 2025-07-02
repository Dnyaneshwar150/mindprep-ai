"use client";

import React from "react";
import { Button, SxProps, Theme } from "@mui/material";

interface CommonButtonProps {
  onClick?: () => void;
  sx?: SxProps<Theme>;
  startIcon?: React.ReactNode;
  children: React.ReactNode;
  iconSx?: SxProps<Theme>;
  disabled?: boolean;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  onClick,
  sx,
  startIcon,
  children,
  disabled,
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        borderRadius: "1rem",
        textTransform: "none",
        fontWeight: "var(--weight-medium)",
        backgroundColor: "var(--button-background)",
        color: "var(--primary-black)",
        fontSize: "0.625rem",
        ...sx,
      }}
      startIcon={startIcon}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
