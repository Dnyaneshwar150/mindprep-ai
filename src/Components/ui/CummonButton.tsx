'use client';

import React from 'react';
import { Button, SxProps, Theme } from '@mui/material';

interface CommonButtonProps  {
  onClick?: () => void;
  sx?: SxProps<Theme>;
  startIcon?: React.ReactNode;
  children: React.ReactNode;
    iconSx?: SxProps<Theme>;
    disabled?:boolean;
};

const CommonButton: React.FC<CommonButtonProps> = ({
  onClick,
  sx,
  startIcon,
  children,
  disabled
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        borderRadius: '8px',
        textTransform: 'none',
        fontWeight: 500,
        backgroundColor:"var(--button-background)",
        color:"var(--primary-black)",
        fontSize:"10px",
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
