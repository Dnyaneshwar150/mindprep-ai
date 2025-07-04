import { Grid, IconButton, Popover, Typography } from "@mui/material";
import CustomTooltip from "./CustomTooltip";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GetAppRoundedIcon from "@mui/icons-material/GetAppRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import FitScreenOutlinedIcon from "@mui/icons-material/FitScreenOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import AddIcon from "@mui/icons-material/Add";
import {
  downloadCheatSheet,
  downloadMindmapToJson,
  uploadMindmapFromFile,
} from "@/utils/pdfUtils/downloadUtils";
import {
  addNode,
  deleteSelectedNodes,
  setEdges,
  setMindmapPresent,
  setMindmapQuestion,
  setNodes,
} from "@/redux/slices/mindmapSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useRef, useState } from "react";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { useSelector } from "react-redux";
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
import CustomDialog from "./CustomDialog";
import { extractCheatSheetDataFromRaw } from "@/utils/pdfUtils/extractCheatSheetData";
import { generateTypeBasedId } from "@/utils/mindmapUtils/mindmapCommonUtils.ts/mindmapCommonUtils";
import { NODE_TYPES_LIST } from "@/types/mindmapData.types";
import { useReactFlow } from "@xyflow/react";
import SaveIcon from "@mui/icons-material/Save";
import { useToast } from "@/app/providers/ToastProvider";

const Toolbar = () => {
  const { fitView } = useReactFlow();
  const showToast = useToast();

  const dispatch = useAppDispatch();
  const canUndo = useSelector(selectCanUndo);
  const canRedo = useSelector(selectCanRedo);
  const loading = useAppSelector(selectMindmapLoading);
  const selectedNodeIds = useAppSelector(selectMindmapSelectedNodeIds);
  const rawJson = useAppSelector(selectMindmapRawJson);
  const isPresent = useSelector(selectMindmapIsPresent);
  const nodes = useAppSelector(selectMindmapNodes);
  const edges = useAppSelector(selectMindmapEdges);
  const mindmapQuestion = useAppSelector(selectMindmapQuestion);
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleFitView = () => {
    fitView({ padding: 0.2 }); // optional: add padding around edges
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirm = () => {
    dispatch(deleteSelectedNodes());
    setOpen(false);
  };

  const handleDownloadCheatSheet = () => {
    const { question, answer, explanations } =
      extractCheatSheetDataFromRaw(rawJson);
    downloadCheatSheet({ question, answer, explanations });
  };

  const handleDownload = () => {
    downloadMindmapToJson({ question: mindmapQuestion, nodes, edges });
  };

  const handleCreateNode = (type: string) => {
    const id = generateTypeBasedId(nodes, type);
    const newNode = {
      id,
      type,
      data: { label: "New Node", type },
      position: { x: 500, y: 50 },
    };
    dispatch(addNode(newNode));
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
      showToast("Mindmap uploaded successfully", "success");
    } catch (err) {
      showToast("❌ Upload failed: " + (err as Error).message, "error");
    } finally {
      e.target.value = "";
    }
  };

  const handleSaveMindMap = async () => {
    try {
      const res = await fetch("/api/mindmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: mindmapQuestion,
          nodes,
          edges,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save mind map");
      }

      showToast("Mindmap uploaded successfully ✅", "success");
    } catch (err) {
      showToast("❌ " + (err as Error).message, "error");
    }
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems='center'
    >
      <Grid
        sx={{
          backgroundColor: "var(--light-grey)",
          borderRadius: "16px",
          marginY: "4px",
          display: "flex",
          paddingX: "36px",
        }}
      >
        <Grid>
          <CustomTooltip title='Upload Mind Map'>
            <span>
              <IconButton
                disabled={loading}
                sx={{
                  color: "var(--light-black)",
                  "&.Mui-disabled": {
                    color: "var(--border-grey)",
                  },
                }}
                onClick={() => {
                  inputRef.current?.click(); // open file selector
                }}
              >
                <UploadFileRoundedIcon fontSize='small' />
              </IconButton>
            </span>
          </CustomTooltip>
          <input
            ref={inputRef}
            type='file'
            accept='.json'
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Grid>

        <Grid>
          <CustomTooltip title='FitToScreen'>
            <span>
              <IconButton
                sx={{
                  color: "var(--light-black)",
                  "&.Mui-disabled": {
                    color: "var(--border-grey)",
                  },
                }}
                disabled={loading || !isPresent}
                onClick={handleFitView}
              >
                <FitScreenOutlinedIcon fontSize='small' />
              </IconButton>
            </span>
          </CustomTooltip>
        </Grid>

        <Grid>
          <CustomTooltip title='Undo'>
            <span>
              <IconButton
                sx={{
                  color: "var(--light-black)",
                  "&.Mui-disabled": {
                    color: "var(--border-grey)",
                  },
                }}
                disabled={!canUndo || loading}
                onClick={() => dispatch(UndoActionCreators.undo())}
              >
                <UndoRoundedIcon fontSize='small' />
              </IconButton>
            </span>
          </CustomTooltip>
        </Grid>
        <Grid>
          <CustomTooltip title='Redo'>
            <span>
              <IconButton
                sx={{
                  color: "var(--light-black)",
                  "&.Mui-disabled": {
                    color: "var(--border-grey)",
                  },
                }}
                disabled={!canRedo || loading}
                onClick={() => dispatch(UndoActionCreators.redo())}
              >
                <RedoRoundedIcon fontSize='small' />
              </IconButton>
            </span>
          </CustomTooltip>
        </Grid>
        <Grid>
          <CustomTooltip title='Relayout Elemenet'>
            <span>
              <IconButton
                sx={{
                  color: "var(--light-black)",
                  "&.Mui-disabled": {
                    color: "var(--border-grey)",
                  },
                }}
                disabled={true}
              >
                <AutorenewOutlinedIcon fontSize='small' />
              </IconButton>
            </span>
          </CustomTooltip>
        </Grid>
        <Grid>
          <CustomTooltip
            title={
              selectedNodeIds.length === 0
                ? "❗Selected Atleast One Node"
                : "Delete Selected Node"
            }
          >
            <span>
              <IconButton
                sx={{
                  color: "var(--light-black)",
                  "&.Mui-disabled": {
                    color: "var(--border-grey)",
                  },
                }}
                disabled={selectedNodeIds.length === 0}
                onClick={() => {
                  setOpen(true);
                }}
              >
                <DeleteRoundedIcon fontSize='small' />
              </IconButton>
            </span>
          </CustomTooltip>

          <CustomDialog
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            onConfirm={handleConfirm}
            title='Are you sure? Deleting a parent node will also remove all of its child nodes.'
          ></CustomDialog>
        </Grid>
        <Grid>
          <CustomTooltip title='Download Cheat Sheet'>
            <span>
              <IconButton
                sx={{
                  color: "var(--light-black)",
                  "&.Mui-disabled": {
                    color: "var(--border-grey)",
                  },
                }}
                disabled={!isPresent}
                onClick={handleDownloadCheatSheet}
              >
                <DescriptionOutlinedIcon fontSize='small' />
              </IconButton>
            </span>
          </CustomTooltip>
        </Grid>
        <Grid>
          <CustomTooltip title='Download Mind Map'>
            <span>
              <IconButton
                sx={{
                  color: "var(--light-black)",
                  "&.Mui-disabled": {
                    color: "var(--border-grey)",
                  },
                }}
                disabled={!isPresent}
                onClick={handleDownload}
              >
                <GetAppRoundedIcon fontSize='small' />
              </IconButton>
            </span>
          </CustomTooltip>
        </Grid>
        <Grid>
          <CustomTooltip title='Create New Node'>
            <span>
              <IconButton
                onClick={handleClick}
                sx={{
                  color: "var(--light-black)",
                  "&.Mui-disabled": {
                    color: "var(--border-grey)",
                  },
                }}
                disabled={loading || !isPresent}
              >
                <AddIcon fontSize='small' />
              </IconButton>
            </span>
          </CustomTooltip>

          <Popover
            open={Boolean(anchorEl)} // ✅ this is the fix
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            sx={{ mt: 1 }}
          >
            <Grid
              container
              direction='column'
              sx={{ p: 2, minWidth: 220 }}
            >
              {NODE_TYPES_LIST.map((type) => (
                <Grid
                  key={type.type}
                  container
                  alignItems='center'
                  onClick={() => {
                    handleCreateNode(type.type);
                    handleClose();
                  }}
                  sx={{
                    px: 1.5,
                    py: 1,
                    borderRadius: 1,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "var(--light-grey)",
                    },
                  }}
                >
                  {/* pill */}
                  <Grid
                    sx={{
                      width: 20,
                      height: 10,
                      borderRadius: "30%",
                      backgroundColor: type.backgroundColor,
                      marginRight: 1.5,
                      border: `1px solid ${type.borderColor}`,
                    }}
                  />
                  <Typography variant='subtitle2'>{type.title}</Typography>
                </Grid>
              ))}
            </Grid>
          </Popover>
        </Grid>

        <Grid>
          <CustomTooltip title='Save Mind Map'>
            <span>
              <IconButton
                sx={{
                  color: "var(--light-black)",
                  "&.Mui-disabled": {
                    color: "var(--border-grey)",
                  },
                }}
                onClick={handleSaveMindMap}
              >
                <SaveIcon fontSize='small' />
              </IconButton>
            </span>
          </CustomTooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Toolbar;
