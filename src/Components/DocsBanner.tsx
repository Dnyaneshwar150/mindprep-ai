"use client";
import { Box, IconButton, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import CommonButton from "./ui/CommonButton";
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
    <Grid
      container
      justifyContent='space-between'
      alignItems='center'
      sx={{
        backgroundColor: "var(--background-grey)",
        border: "1px solid var(--border-grey)",
        padding: "0.375rem 0.5rem",
        fontSize: "0.75rem",
        color: "var(--primary-grey)",
        borderRadius: "0.375rem",
        margin: "0.125rem auto",
        maxWidth: 960,
        flexWrap: "wrap",
      }}
    >
      <Grid>
        <Box fontSize='0.75rem'>
          This is a prototype of <strong>MindPrep.AI</strong>. View version info
          & upcoming features in the docs.
        </Box>
      </Grid>

      <Grid>
        <Box
          display='flex'
          justifyContent={{ xs: "flex-start", sm: "flex-end" }}
          gap='0.5rem'
          mt={{ xs: "0.5rem", sm: 0 }}
        >
          <Link href='/about'>
            <CommonButton>Go to Docs</CommonButton>
          </Link>

          <IconButton
            size='small'
            onClick={() => dispatch(setDocsBannerDismissed(true))}
            sx={{ color: "var(--primary-grey)" }}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}
