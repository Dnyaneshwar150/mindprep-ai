'use client'
// import { initialEdges, initialNodes } from '@/constants';
import "@xyflow/react/dist/style.css";
import {
  Background, BackgroundVariant, ReactFlow, useNodesState, useEdgesState, ConnectionMode, Connection, MarkerType, Panel, Controls, Node,
  Edge,
} from '@xyflow/react'
import React, { useCallback, useEffect, } from 'react'
import { v4 as uuid } from "uuid";
import { Grid } from '@mui/material';
import PannelComponent from '@/Components/mindmap/PannelComponent';
import Sidebar from '@/Components/Sidebar';
import { edgeTypes, nodeTypes } from "@/constants/flowTypes";
import { useMindmapVisibility } from "@/hooks/useMindmapVisibility";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
//Todo: selectMindmapLoadingm add later in loading state
import { selectMindmapEdges,  selectMindmapNodes } from "@/redux/mindmapSelectors";
import { setSelectedNodeIds } from "@/redux/slices/mindmapSlice";

function Workflow() {

  const reduxNodes = useAppSelector(selectMindmapNodes);
  const reduxEdges = useAppSelector(selectMindmapEdges);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    setNodes(reduxNodes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxNodes]);

  useEffect(() => {
    setEdges(reduxEdges);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxEdges]);
  
 const dispatch = useAppDispatch();


  // const loading = useAppSelector(selectMindmapLoading);

  const onConnect = useCallback((connection: Connection) => {
    const edge = {
      ...connection,
      type: 'wire',
      markerEnd: {
        type: MarkerType.ArrowClosed,
        height: 20,
        width: 20,
        color: "#A9A9A9"
      },
      id: uuid(),
    };
    setEdges((eds) => eds.concat(edge));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  // Toggle children visibility
  const {
    filteredEdges,
    filteredNodes,
  } = useMindmapVisibility(nodes, edges);

  return (
    <Grid container >

      <Grid sx={{  height: "100vh", width: "75%", position: "relative", bgcolor: "var(--light-grey)", display: "flex", justifyContent: 'center', alignItems: "center" }} >
        <ReactFlow
          nodes={filteredNodes}
          edges={filteredEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionMode={ConnectionMode.Loose}
          nodeTypes={nodeTypes}
          fitView
          edgeTypes={edgeTypes}
          proOptions={{ hideAttribution: true }}
       onSelectionChange={({ nodes }) => {
    const selectedIds = nodes.map((n) => n.id);
    dispatch(setSelectedNodeIds(selectedIds)); // ← send to Redux
  }}    
        >
          <Panel
            position="bottom-left"
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
            color="#AA4A44"
            id="1"
          />
          <Controls position='bottom-right' />
        </ReactFlow>
      </Grid>
      <Grid sx={{  width: "25%" }}>
        <Sidebar />
      </Grid>
    </Grid>



  )
}

export default Workflow