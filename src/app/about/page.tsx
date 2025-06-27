"use client";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useRouter } from "next/navigation";
import { setDocsBannerDismissed } from "@/redux/slices/mindmapSlice";
import { useDispatch } from "react-redux";

export default function DocsPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleBackClick = () => {
    router.back();
    dispatch(setDocsBannerDismissed(true));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", px: 2, py: 3 }}>
      <IconButton
        onClick={handleBackClick}
        aria-label='Go back'
      >
        <KeyboardBackspaceIcon fontSize='medium' />
      </IconButton>
      <Typography
        variant='h4'
        fontWeight={600}
        gutterBottom
      >
        About MindPrep.AI
      </Typography>

      <Typography
        variant='body1'
        sx={{ fontSize: 14, color: "gray" }}
        paragraph
      >
        Students often struggle with structuring their exam answers, especially
        under pressure. They need a clear, concise, and visual approach to
        organizing information—something more intuitive than plain text.
      </Typography>

      <Typography
        variant='body1'
        sx={{ fontSize: 14, color: "gray" }}
        paragraph
      >
        <strong>MindPrep.AI</strong> helps students transform complex answers
        into clean, connected visual mind maps using AI. This tool streamlines
        learning and improves recall using smart branching, customizable nodes,
        and cheat sheet export features.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant='h6'
        gutterBottom
      >
        Version History
      </Typography>

      <List
        dense
        sx={{ pl: 2 }}
      >
        <ListItem disableGutters>
          <Typography variant='body2'>
            <strong>v0.1.0:</strong> Initial prototype released – mind map
            generation using OpenAI, basic visualization.
          </Typography>
        </ListItem>
        <ListItem disableGutters>
          <Typography variant='body2'>
            <strong>v0.2.0:</strong> Node creation, selection, deletion,
            Undo,Redo and explanation added. Export to PDF for cheat sheet.
          </Typography>
        </ListItem>
        <ListItem disableGutters>
          <Typography variant='body2'>
            <strong>v0.3.0 (Upcoming):</strong> User authentication, cloud sync,
            and mind map history per user.
          </Typography>
        </ListItem>
        <ListItem disableGutters>
          <Typography variant='body2'>
            <strong>v0.4.0 (Planned):</strong> Mind map collaboration, comment
            mode, and advanced layout controls.
          </Typography>
        </ListItem>
        <ListItem disableGutters>
          <Typography variant='body2'>
            <strong>Stable Release (Soon):</strong> Production-ready version
            with better UX, performance tuning, and multi-answer organization.
          </Typography>
        </ListItem>
      </List>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant='h6'
        gutterBottom
      >
        🖱️ Shortcuts & Tips
      </Typography>

      <List
        dense
        sx={{ pl: 2 }}
      >
        <ListItem disableGutters>
          <Typography variant='body2'>
            <strong>Ctrl / Shift + Click:</strong> Select multiple nodes on the
            mindmap
          </Typography>
        </ListItem>

        <ListItem disableGutters>
          <Typography variant='body2'>
            <strong>Double Click on Node:</strong> Edit its label
          </Typography>
        </ListItem>

        <ListItem disableGutters>
          <Typography variant='body2'>
            <strong>Delete Key:</strong> Remove selected node(s)
          </Typography>
        </ListItem>

        <ListItem disableGutters>
          <Typography variant='body2'>
            <strong>Go to Docs:</strong> Find this section again anytime from
            the navbar
          </Typography>
        </ListItem>
      </List>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant='body2'
        color='gray'
      >
        💬 Have feedback, ideas, or suggestions? Connect with the creator at{" "}
        <a
          href='https://www.dnyaneshwardimble.xyz/'
          target='_blank'
          rel='noopener noreferrer'
          style={{ color: "inherit", textDecoration: "underline" }}
        >
          dnyaneshwardimble.xyz
        </a>
      </Typography>
    </Box>
  );
}
