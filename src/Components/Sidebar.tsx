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
import { fetchExplanationFromGPT } from "@/api/prompts/buildExplanationPrompt";

import CustomTooltip from "./ui/CustomTooltip";
import { useSelector } from "react-redux";

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

  const handleExplainSelectedNode = async () => {
    if (selectedNodeIds.length !== 1) return;

    const selectedId = selectedNodeIds[0];
    const node = nodes.find((n) => n.id === selectedId);
    if (!node) return;
    const label = node.data.label;

    if (label === "New Node") {
      setExplanation("⚠️ Selected node must have content");
      return;
    }

    setExplaining(true);
    const explanation = await fetchExplanationFromGPT(
      label,
      explanationInstruction,
    );
    setExplanation(explanation);
    setExplaining(false);
  };

  const handleGenerate = () => {
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
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#fff",
        px: 2,
        py: 1,
        overflowY: "auto",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Section: Question Details */}
      <Typography fontWeight={600}>Question Details</Typography>

      <Typography
        fontSize={13}
        mb={0.5}
      >
        Enter Question Below
      </Typography>

      <TextField
        fullWidth
        placeholder='Enter the question here...'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        size='small'
        multiline
        minRows={2}
        sx={{ mb: 2 }}
      />
      <FormControl
        fullWidth
        size='small'
        sx={{ mb: 2 }}
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

      <FormControl
        fullWidth
        size='small'
        sx={{ mb: 2 }}
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

      <TextField
        fullWidth
        label='Subject'
        placeholder='Enter Subject'
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        size='small'
        multiline
        minRows={1}
        sx={{ mb: 1 }}
      />
      <TextField
        fullWidth
        label='Any additional instructions'
        placeholder='e.g. Explain like I am 10'
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        size='small'
        multiline
        minRows={1}
        sx={{ mb: 1 }}
      />

      <CommonButton
        disabled={loading || !question || isPresent}
        onClick={handleGenerate}
        sx={{
          mb: 1,
          width: "100%",
        }}
      >
        {loading ? "Generating..." : "🧠 Generate Mind Map"}
      </CommonButton>

      <Typography
        fontWeight={600}
        mb={1.5}
      >
        Explanation of Nodes
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label='Would you like to give extra instructions?'
          placeholder='e.g. Explain with examples, be concise, use simple language'
          value={explanationInstruction}
          onChange={(e) => setExplanationInstruction(e.target.value)}
          size='small'
          multiline
          minRows={2}
          sx={{ mb: 2 }}
        />

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
              sx={{ width: "100%", mb: 2 }}
              disabled={selectedNodeIds.length !== 1 || loading}
              onClick={handleExplainSelectedNode}
            >
              {explaining ? "Explaining..." : "💬 Explain Selected Node"}
            </CommonButton>
          </span>
        </CustomTooltip>

        {explanation && (
          <Box
            sx={{
              bgcolor: "#f1f1f1",
              p: 2,
              borderRadius: 1,
              fontSize: 13,
              whiteSpace: "pre-line",
              mb: 2,
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

      <Divider sx={{ my: 2 }} />

      <Typography
        variant='caption'
        color='gray'
      >
        Version 0.2.0
      </Typography>
    </Box>
  );
};

export default Sidebar;
