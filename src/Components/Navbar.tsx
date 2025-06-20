'use client';

import React from 'react';
import { AppBar, Box,  Toolbar, Typography,  } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import CommonButton from './ui/CummonButton';

function Navbar() {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{height:50 ,justifyContent:"center"}} >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: Logo and Title */}
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            component="img"
            src="/logo.png" // update with your actual logo path
            alt="logo"
            sx={{ width: 18, height: 18 }}
          />
          <Typography fontSize={"18px"} fontWeight={600} color="black">
          MindPrep.Ai
          </Typography>
        </Box>

        {/* Right: Buttons */}
        <Box display="flex" alignItems="center" gap={1}>
          <CommonButton startIcon={<SaveIcon style={{fontSize:"16px"}}/>}>
            Save
          </CommonButton>
          <CommonButton startIcon={<ShareIcon style={{fontSize:"16px"}} />} >
            Share
          </CommonButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
