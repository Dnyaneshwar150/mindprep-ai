"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectMindmapIsPresent,
  selectMindmapLoading,
  selectMindmapNodes,
  selectMindmapSelectedNodeIds,
} from "@/redux/mindmapSelectors";
import CommonButton from "./ui/CummonButton";
import { fetchMindmapFromGPT } from "@/api/prompts/buildMindmapPrompts";

import CustomTooltip from "./ui/CustomTooltip";
import { useSelector } from "react-redux";
import LoginModal from "./LoginModal";
import { useSession } from "next-auth/react";
import MindMapList from "./MindmapList";
import { fetchExplanation } from "@/utils/mindmapUtils/mindmapFetchUtils";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const isPresent = useSelector(selectMindmapIsPresent);
  const loading = useAppSelector(selectMindmapLoading);
  const selectedNodeIds = useAppSelector(selectMindmapSelectedNodeIds);
  const nodes = useAppSelector(selectMindmapNodes);

  const [question, setQuestion] = useState("");
  const [mainPointCount, setMainPointCount] = useState(1);
  const [subPointCount, setSubPointCount] = useState(1);
  const [explanation, setExplanation] = useState("");
  const [explaining, setExplaining] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [subject, setSubject] = useState("");
  const [explanationInstruction, setExplanationInstruction] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { data: session, status } = useSession();

  const handleExplainSelectedNode = async () => {
    if (selectedNodeIds.length !== 1) return;

    const selectedId = selectedNodeIds[0];
    const node = nodes.find((n) => n.id === selectedId);
    if (!node) return;

    const label = node.data.label;

    if (!label || label === "New Node") {
      setExplanation("⚠️ Selected node must have content");
      return;
    }

    try {
      setExplaining(true);
      const explanation = await fetchExplanation(label, explanationInstruction);
      setExplanation(explanation);
    } catch {
      setExplanation("❌ Failed to fetch explanation.");
    } finally {
      setExplaining(false);
    }
  };

  const handleGenerate = () => {
    if (!session?.user) {
      setShowLoginModal(true); // custom modal popup
      return;
    }
    dispatch(
      fetchMindmapFromGPT({
        question,
        mainPointCount,
        subPointCount,
        subject,
        instructions,
      }),
    );
  };

  useEffect(() => {
    if (!isPresent) {
      setQuestion("");
    }
  }, [isPresent]);

  return (
    <Grid
      sx={{
        bgcolor: "var(--white)",
        px: "1rem",
        py: "0.2rem",
        overflowY: "auto",
      }}
    >
      <Typography fontWeight={600}>Question Details</Typography>
      <Typography fontSize={13}>Enter Question Below</Typography>

      <Grid
        container
        sx={{ flexDirection: "column", gap: "0.8rem" }}
      >
        <Grid>
          <TextField
            fullWidth
            placeholder='Enter the question here...'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            size='small'
            multiline
            minRows={2}
          />
        </Grid>

        <Grid>
          <FormControl
            fullWidth
            size='small'
          >
            <InputLabel>Main Points</InputLabel>
            <Select
              value={mainPointCount}
              label='Main Points'
              onChange={(e) => setMainPointCount(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <MenuItem
                  key={num}
                  value={num}
                >
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid>
          <FormControl
            fullWidth
            size='small'
          >
            <InputLabel>Subpoints</InputLabel>
            <Select
              value={subPointCount}
              label='Subpoints'
              onChange={(e) => setSubPointCount(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <MenuItem
                  key={num}
                  value={num}
                >
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid>
          <TextField
            fullWidth
            label='Subject'
            placeholder='Enter Subject'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            size='small'
            multiline
            minRows={1}
          />
        </Grid>

        <Grid>
          <TextField
            fullWidth
            label='Any additional instructions'
            placeholder='e.g. Explain like I am 10'
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            size='small'
            multiline
            minRows={1}
          />
        </Grid>

        <Grid>
          <CommonButton
            disabled={loading || !question || isPresent}
            onClick={handleGenerate}
            sx={{
              width: "100%",
            }}
          >
            {loading ? "Generating..." : "🧠 Generate Mind Map"}
          </CommonButton>
        </Grid>

        <LoginModal
          open={showLoginModal}
          onLoginModalCloseAction={() => setShowLoginModal(false)}
        />

        <Grid
          container
          flexDirection={"column"}
          gap={"0.7rem"}
        >
          <Grid sx={{ fontWeight: "600", fontSize: "1rem" }}>
            Explanation of Nodes
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label='Would you like to give extra instructions?'
              placeholder='e.g. Explain with examples, be concise, use simple language'
              value={explanationInstruction}
              onChange={(e) => setExplanationInstruction(e.target.value)}
              size='small'
              multiline
              minRows={2}
            />
          </Grid>

          <Grid>
            <CustomTooltip
              title={
                selectedNodeIds.length > 1
                  ? "❗ Only one node can be explained at a time."
                  : ""
              }
              disableHoverListener={selectedNodeIds.length <= 1}
            >
              <span>
                <CommonButton
                  sx={{ width: "100%" }}
                  disabled={selectedNodeIds.length !== 1 || loading}
                  onClick={handleExplainSelectedNode}
                >
                  {explaining ? "Explaining..." : "💬 Explain Selected Node"}
                </CommonButton>
              </span>
            </CustomTooltip>
          </Grid>
        </Grid>

        <Box>
          {explanation && (
            <Box
              sx={{
                bgcolor: "#f1f1f1",
                p: 2,
                borderRadius: 1,
                fontSize: 13,
                whiteSpace: "pre-line",
                maxHeight: 150,
                overflowY: "auto",
                position: "relative",
              }}
            >
              <IconButton
                size='small'
                onClick={() => setExplanation("")}
                sx={{ position: "absolute", top: 4, right: 4 }}
              >
                <CloseIcon fontSize='small' />
              </IconButton>

              {explanation}
            </Box>
          )}
        </Box>
      </Grid>

      {status === "authenticated" && (
        <Grid>
          <MindMapList />
        </Grid>
      )}

      <Divider sx={{ my: 2 }} />

      <Typography
        variant='caption'
        color='gray'
      >
        Version 0.3.0
      </Typography>
    </Grid>
  );
};

export default Sidebar;
