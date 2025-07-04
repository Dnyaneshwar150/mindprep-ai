"use client";

import { useEffect, useState } from "react";
import { List, ListItemButton, CircularProgress, Grid } from "@mui/material";
import { useAppDispatch } from "@/hooks/reduxHooks";
import {
  setEdges,
  setMindmapPresent,
  setMindmapQuestion,
  setNodes,
} from "@/redux/slices/mindmapSlice";

interface Mindmap {
  _id: string;
  question: string;
}

export default function MindMapList() {
  const [maps, setMaps] = useState<Mindmap[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchMindmaps = async () => {
      const res = await fetch("/api/mindmap");
      const data = await res.json();
      setMaps(data);
      setLoading(false);
    };

    fetchMindmaps();
  }, []);

  const handleMindmapClick = async (id: string) => {
    const res = await fetch(`/api/mindmap/${id}`);
    const data = await res.json();

    if (res.ok) {
      dispatch(setNodes(data.nodes));
      dispatch(setEdges(data.edges));
      dispatch(setMindmapQuestion(data.question));
      dispatch(setMindmapPresent(true));
    } else {
      // add toast
      // alert(data.error || "Failed to load mindmap");
    }
  };

  if (loading) {
    return;
    <Grid
      container
      justifyContent={"center"}
    >
      <CircularProgress />
    </Grid>;
  }

  return (
    <Grid>
      <Grid sx={{ fontWeight: "600", fontSize: "1rem" }}>Saved Mindmaps</Grid>
      <Grid
        sx={{
          maxHeight: "200px",
          overflowY: "auto",
          borderRadius: "8px",
          border: "1px solid #eee",
        }}
      >
        <List sx={{ padding: 0 }}>
          {maps.map((map) => (
            <ListItemButton
              key={map._id}
              onClick={() => handleMindmapClick(map._id)}
              sx={{
                borderBottom: "1px solid #e0e0e0",
                padding: "0.75rem 1rem",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <Grid sx={{ fontSize: "0.95rem", color: "#333" }}>
                {map.question}
              </Grid>
            </ListItemButton>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
