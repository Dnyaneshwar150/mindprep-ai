"use client";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import CommonButton from "./ui/CummonButton";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectDocsBannerDismissed } from "@/redux/uiSelectors";
import { setDocsBannerDismissed } from "@/redux/slices/mindmapSlice";

export default function DocsBanner() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const dismissed = useSelector(selectDocsBannerDismissed);

  if (dismissed || pathname === "/about") return null;
  return (
    <Box
      sx={{
        backgroundColor: "var(--background-grey)",
        border: "1px solid var(--border-grey)",
        padding: "6px 8px",
        fontSize: "12px",
        color: "var(--primary-grey)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "6px",
        margin: "2px auto",
        maxWidth: 960,
      }}
    >
      <Typography
        variant='body2'
        sx={{ fontSize: "12px" }}
      >
        This is a prototype of <strong>MindPrep.AI</strong>. View version info &
        upcoming features in the docs.
      </Typography>

      <Box
        display='flex'
        alignItems='center'
        gap={1}
      >
        <Link href='/about'>
          <CommonButton>Go to Docs →</CommonButton>
        </Link>

        <IconButton
          size='small'
          onClick={() => dispatch(setDocsBannerDismissed(true))}
          sx={{ color: "var(--primary-grey)" }}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      </Box>
    </Box>
  );
}
