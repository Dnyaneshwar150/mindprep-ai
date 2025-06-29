"use client";
// import { initialEdges, initialNodes } from '@/constants';
import "@xyflow/react/dist/style.css";
import {
  Background,
  BackgroundVariant,
  ReactFlow,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Connection,
  MarkerType,
  Panel,
  Controls,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import React, { useCallback, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { CircularProgress, Grid } from "@mui/material";
import PannelComponent from "@/Components/mindmap/PannelComponent";
import Sidebar from "@/Components/Sidebar";
import { edgeTypes, nodeTypes } from "@/constants/flowTypes";
import { useMindmapVisibility } from "@/hooks/useMindmapVisibility";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectMindmapEdges,
  selectMindmapLoading,
  selectMindmapNodes,
} from "@/redux/mindmapSelectors";
import {
  addEdge,
  clearSelectedNodeIds,
  setEdges,
  setNodes,
  toggleNodeSelection,
} from "@/redux/slices/mindmapSlice";
import Toolbar from "@/Components/ui/ToolBar";
import Typewriter from "@/Components/ui/TypeWriter";

function Workflow() {
  const dispatch = useAppDispatch();

  const reduxNodes = useAppSelector(selectMindmapNodes);
  const reduxEdges = useAppSelector(selectMindmapEdges);
  const isLoading = useAppSelector(selectMindmapLoading);

  const [nodes, setLocalNodes] = useNodesState<Node>([]);
  const [edges, setLocalEdges] = useEdgesState<Edge>([]);

  useEffect(() => {
    setLocalNodes(reduxNodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxNodes]);

  useEffect(() => {
    setLocalEdges(reduxEdges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxEdges]);

  const { filteredEdges, filteredNodes } = useMindmapVisibility(nodes, edges);

  const handleNodesChange: OnNodesChange = (changes) => {
    const clonedNodes = JSON.parse(JSON.stringify(nodes)); // deep clone first
    const updatedNodes = applyNodeChanges(changes, clonedNodes);
    dispatch(setNodes(updatedNodes));
  };

  const handleEdgesChange: OnEdgesChange = (changes) => {
    const updatedEdges = applyEdgeChanges(changes, edges);
    dispatch(setEdges(updatedEdges));
  };

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        type: "wire",
        markerEnd: {
          type: MarkerType.ArrowClosed,
          height: 20,
          width: 20,
          color: "#A9A9A9",
        },
        id: uuid(),
      };
      dispatch(addEdge(edge));
    },
    [dispatch],
  );

  return (
    <Grid container>
      <Grid sx={{ width: "25%" }}>
        <Sidebar />
      </Grid>
      <Grid sx={{ width: "75%" }}>
        <Grid>
          <Toolbar />
        </Grid>
        <Grid
          sx={{
            height: "88vh",
            position: "relative",
            bgcolor: "var(--light-grey)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "4px",
          }}
        >
          {isLoading ? (
            <Grid
              container
              flexDirection={"column"}
              alignItems={"center"}
            >
              <CircularProgress
                size='30px'
                style={{ color: "var(--primary-black)" }}
              />
              <Typewriter
                texts={[
                  "Analyzing your question...",
                  "Generating mindmap...",
                  "Plotting mindmap structure...",
                ]}
              />
            </Grid>
          ) : (
            <ReactFlow
              nodes={filteredNodes}
              edges={filteredEdges}
              onNodesChange={handleNodesChange}
              onEdgesChange={handleEdgesChange}
              onConnect={onConnect}
              connectionMode={ConnectionMode.Loose}
              nodeTypes={nodeTypes}
              fitView
              edgeTypes={edgeTypes}
              proOptions={{ hideAttribution: true }}
              selectNodesOnDrag={false} // <-- Prevent selection on drag
              elementsSelectable={false} // <-- Disable default selection
              onNodeClick={(event, node) => {
                if (event.ctrlKey || event.metaKey) {
                  dispatch(toggleNodeSelection(node.id));
                }
              }}
              onPaneClick={() => {
                dispatch(clearSelectedNodeIds());
              }}
            >
              <Panel
                position='bottom-left'
                style={{
                  border: "1px solid #ccc",
                  padding: 12,
                  borderRadius: 12,
                  width: "150px",
                }}
              >
                <PannelComponent />
              </Panel>
              <Background
                variant={BackgroundVariant.Dots}
                gap={100}
                color='#AA4A44'
                id='1'
              />
              <Controls position='bottom-right' />
            </ReactFlow>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Workflow;
