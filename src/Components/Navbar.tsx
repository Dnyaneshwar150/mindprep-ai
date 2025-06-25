"use client";
import React, { useState } from "react";
import { AppBar, Box, Chip, Toolbar, Typography } from "@mui/material";
import CommonButton from "./ui/CummonButton";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { resetMindmap } from "@/redux/slices/mindmapSlice";
import CustomDialog from "./ui/CustomDialog";
import { selectMindmapIsPresent } from "@/redux/mindmapSelectors";

function Navbar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const isPresent = useSelector(selectMindmapIsPresent);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleCreateNewMindmap = () => {
    dispatch(resetMindmap());
  };

  const handleConfirm = () => {
    handleCreateNewMindmap();
    handleCloseDialog();
  };

  return (
    <AppBar
      position='static'
      color='transparent'
      elevation={0}
      sx={{ height: 40, justifyContent: "center" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          display='flex'
          alignItems='center'
          gap={1}
        >
          <Link
            href='/'
            style={{ textDecoration: "none" }}
          >
            <Typography
              fontSize='18px'
              fontWeight={600}
              color='black'
              sx={{ cursor: "pointer" }}
            >
              MindPrep.Ai
            </Typography>
          </Link>
          <Chip
            label='Beta'
            size='small'
            color='warning'
            sx={{ fontWeight: "bold", height: 20, ml: 0.2 }}
          />
        </Box>

        {/* Right: Buttons */}
        <Box
          display='flex'
          alignItems='center'
          gap={1}
        >
          <Link href='/about'>
            <CommonButton>Go to Docs →</CommonButton>
          </Link>
          <CommonButton
            onClick={handleOpenDialog}
            disabled={!isPresent}
          >
            Create New MindMap{" "}
          </CommonButton>
        </Box>

        <CustomDialog
          open={open}
          onClose={handleCloseDialog}
          onConfirm={handleConfirm}
          title='Are You Sure? Current MindMap Will Be Discarded.'
        ></CustomDialog>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
