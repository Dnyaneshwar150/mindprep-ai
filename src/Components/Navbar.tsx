'use client';

import React from 'react';
import { AppBar, Box, Chip, Toolbar, Typography, } from '@mui/material';
// import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import CommonButton from './ui/CummonButton';
import Link from 'next/link';


function Navbar() {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ height: 40, justifyContent: "center" }} >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: Logo and Title */}
        <Box display="flex" alignItems="center" gap={1}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Typography fontSize="18px" fontWeight={600} color="black" sx={{ cursor: 'pointer' }}>
              MindPrep.Ai
            </Typography>
          </Link>
          <Chip
            label="Beta"
            size="small"
            color="warning"
            sx={{ fontWeight: 'bold', height: 20, ml: 0.2 }}
          />

        </Box>

        {/* Right: Buttons */}
        <Box display="flex" alignItems="center" gap={1}>
          {/* <CommonButton startIcon={<SaveIcon style={{fontSize:"16px"}}/>}>
            Save
          </CommonButton> */}
          <Link href="/about">
            <CommonButton
            >
              Go to Docs →
            </CommonButton>
          </Link>
          <CommonButton startIcon={<ShareIcon style={{ fontSize: "16px" }} />} >
            Share
          </CommonButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
