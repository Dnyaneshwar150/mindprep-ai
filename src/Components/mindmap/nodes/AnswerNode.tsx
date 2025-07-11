import React, { useState, useRef, useEffect } from "react";
import { Handle, NodeProps, Node } from "@xyflow/react";
import { Typography, IconButton, Box, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import NodeWrapper from "../NodeWrapper";
import CustomTooltip from "../../ui/CustomTooltip";
import { AnswerNodeData } from "@/types/mindmap.types";
import { useDispatch } from "react-redux";
import { updateNodeLabel } from "@/redux/slices/mindmapSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectMindmapSelectedNodeIds } from "@/redux/mindmapSelectors";
import useHandlePosition from "@/hooks/useHandlePoistion";

export default function AnswerNode({ id, data }: NodeProps<Node<AnswerNodeData>>) {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);
  const { sourcePosition, targetPosition } = useHandlePosition();

  const selectedNodeIds = useAppSelector(selectMindmapSelectedNodeIds);
  const isSelected = selectedNodeIds.includes(id);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedLabel.trim() !== data.label) {
      dispatch(updateNodeLabel({ nodeId: id, newLabel: editedLabel }));
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    if (isEditing) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isEditing]);

  if (!data.label) return null;

  return (
    <NodeWrapper
      sx={{
        borderColor: isSelected ? "var(--primary-black)" : "var(--border-green)",
        backgroundColor: isSelected ? "var(--border-red)" : "var(--background-green)",
        width: "280px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", padding: "8px" }}>
        {isEditing ? (
          <TextField
            inputRef={inputRef}
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            size="small"
            fullWidth
            variant="standard"
            autoFocus
          />
        ) : (
          <Typography
            onDoubleClick={handleDoubleClick}
            sx={{
              fontSize: "18px",
              flex: 1,
              overflow: expanded ? "visible" : "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: expanded ? "unset" : 1,
              WebkitBoxOrient: "vertical",
              whiteSpace: expanded ? "normal" : "nowrap",
              wordBreak: "break-word",
              cursor: "pointer",
            }}
          >
            {data.label}
          </Typography>
        )}

        <CustomTooltip title={expanded ? "Collapse" : "Expand"}>
          <IconButton
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={{ ml: 1, alignSelf: "center", padding: "2px" }}
          >
            {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </IconButton>
        </CustomTooltip>
      </Box>

      <Handle type="target" position={targetPosition} id="answer-from-question" />
      <Handle type="source" position={sourcePosition} id="answer-to-main-point-heading" />
    </NodeWrapper>
  );
}
