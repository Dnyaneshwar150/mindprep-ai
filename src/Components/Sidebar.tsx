"use client";
import React, { useRef, useState } from "react";
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
import DownloadIcon from "@mui/icons-material/Download"; // or any icon you prefer
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectCanRedo,
  selectCanUndo,
  selectMindmapEdges,
  selectMindmapIsPresent,
  selectMindmapLoading,
  selectMindmapNodes,
  selectMindmapQuestion,
  selectMindmapRawJson,
  selectMindmapSelectedNodeIds,
} from "@/redux/mindmapSelectors";
import {
  addNode,
  deleteSelectedNodes,
  setEdges,
  setNodes,
  setMindmapQuestion,
  setMindmapPresent,
} from "@/redux/slices/mindmapSlice";
import CommonButton from "./ui/CummonButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { generateTypeBasedId } from "@/utils/mindmapUtils/mindmapCommonUtils.ts/mindmapCommonUtils";
import { useSelector } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { NODE_TYPES } from "@/types/mindmapData.types";
import { fetchMindmapFromGPT } from "@/api/prompts/buildMindmapPrompts";
import { fetchExplanationFromGPT } from "@/api/prompts/buildExplanationPrompt";
import {
  downloadCheatSheet,
  downloadMindmapToJson,
  uploadMindmapFromFile,
} from "@/utils/pdfUtils/downloadUtils";
import { extractCheatSheetDataFromRaw } from "@/utils/pdfUtils/extractCheatSheetData";
import CustomDialog from "./ui/CustomDialog";
import CustomTooltip from "./ui/CustomTooltip";

const Sidebar = () => {
  const [question, setQuestion] = useState("");
  const [mainPointCount, setMainPointCount] = useState(1);
  const [subPointCount, setSubPointCount] = useState(1);
  const [newNodeType, setNewNodeType] = useState("mainPointNode");
  const [explanation, setExplanation] = useState("");
  const [explaining, setExplaining] = useState(false);
  const [open, setOpen] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [subject, setSubject] = useState("");
  const [explanationInstruction, setExplanationInstruction] = useState("");

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectMindmapLoading);
  const selectedNodeIds = useAppSelector(selectMindmapSelectedNodeIds);
  const nodes = useAppSelector(selectMindmapNodes);
  const edges = useAppSelector(selectMindmapEdges);
  const mindmapQuestion = useAppSelector(selectMindmapQuestion);
  const rawJson = useAppSelector(selectMindmapRawJson);
  const canUndo = useSelector(selectCanUndo);
  const canRedo = useSelector(selectCanRedo);
  const isPresent = useSelector(selectMindmapIsPresent);

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

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    dispatch(deleteSelectedNodes());
    setOpen(false);
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

  const handleCreateNode = () => {
    const id = generateTypeBasedId(nodes, newNodeType);
    const newNode = {
      id,
      type: newNodeType,
      data: { label: "New Node", type: newNodeType },
      position: { x: 500, y: 50 },
    };
    dispatch(addNode(newNode));
  };

  const handleDownloadCheatSheet = () => {
    const { question, answer, explanations } =
      extractCheatSheetDataFromRaw(rawJson);
    downloadCheatSheet({ question, answer, explanations });
  };

  // const handleRelayout = () => {
  //   const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  //     nodes,
  //     edges,
  //   );
  //   dispatch(setNodes(layoutedNodes));
  //   dispatch(setEdges(layoutedEdges));
  // };

  const handleDownload = () => {
    downloadMindmapToJson({ question: mindmapQuestion, nodes, edges });
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    inputRef.current?.click(); // open file selector
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const {
        question: extractedquestion,
        nodes,
        edges,
      } = await uploadMindmapFromFile(file);

      dispatch(setNodes(nodes));
      dispatch(setEdges(edges));
      dispatch(setMindmapQuestion(extractedquestion));
      dispatch(setMindmapPresent(true));

      alert("Mindmap uploaded successfully ✅");
    } catch (err) {
      alert("❌ Upload failed: " + (err as Error).message);
    } finally {
      e.target.value = ""; // reset input so re-uploading same file works
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#fff",
        p: 2,
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

      <CommonButton
        sx={{ width: "100%", my: "10px" }}
        startIcon={<DeleteOutlineIcon style={{ fontSize: "16px" }} />}
        disabled={selectedNodeIds.length === 0}
        onClick={handleOpenDialog}
      >
        Delete Selected nodes
      </CommonButton>

      <CustomDialog
        open={open}
        onClose={handleCloseDialog}
        onConfirm={handleConfirm}
        title='Are you sure? Deleting a parent node will also remove all of its child nodes.'
      ></CustomDialog>

      <Typography
        fontWeight={600}
        mb={1.5}
      >
        ➕ Create Node
      </Typography>

      <FormControl
        fullWidth
        size='small'
        sx={{ mb: 1 }}
      >
        <InputLabel>Node Type</InputLabel>
        <Select
          value={newNodeType}
          label='Node Type'
          onChange={(e) => setNewNodeType(e.target.value)}
        >
          {NODE_TYPES.map((type) => (
            <MenuItem
              key={type.value}
              value={type.value}
            >
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <CommonButton
        onClick={handleCreateNode}
        sx={{ mb: 1, width: "100%" }}
        startIcon={<AddIcon />}
        disabled={loading || !isPresent}
      >
        Add New Node
      </CommonButton>

      <Box
        display='flex'
        gap={1}
        my={2}
      >
        <CommonButton
          disabled={!canUndo || loading}
          onClick={() => dispatch(UndoActionCreators.undo())}
        >
          Undo
        </CommonButton>
        <CommonButton
          disabled={!canRedo || loading}
          onClick={() => dispatch(UndoActionCreators.redo())}
        >
          Redo
        </CommonButton>
      </Box>
      {/* <CommonButton
        disabled={loading || !isPresent}
        onClick={handleRelayout}
        sx={{
          mb: 2,
          width: "100%",
        }}
      >
        Re-Layout Mind Map
      </CommonButton> */}

      {/* this is  */}
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
      <CommonButton
        sx={{ width: "100%", my: "10px" }}
        startIcon={<UploadFileIcon style={{ fontSize: "16px" }} />}
        onClick={handleUploadClick}
      >
        Upload Mindmap
      </CommonButton>

      <input
        ref={inputRef}
        type='file'
        accept='.json'
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <CommonButton
        sx={{ width: "100%", my: "10px" }}
        startIcon={<DownloadIcon style={{ fontSize: "16px" }} />}
        disabled={nodes.length === 0}
        onClick={handleDownload}
      >
        Download Mindmap
      </CommonButton>
      <CommonButton
        sx={{ width: "100%", mb: 2 }}
        disabled={!nodes.length}
        onClick={handleDownloadCheatSheet}
      >
        📥 Download Cheatsheet
      </CommonButton>

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
