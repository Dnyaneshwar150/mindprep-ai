'use client'
// import { initialEdges, initialNodes } from '@/constants';
import "@xyflow/react/dist/style.css";
import { Background, BackgroundVariant, ReactFlow, useNodesState, useEdgesState, ConnectionMode, Connection, MarkerType, Panel, Controls } from '@xyflow/react'
import React, { useCallback} from 'react'
import { v4 as uuid } from "uuid";
import jsonData from '../Workflow/mockData.json'
import { Grid } from '@mui/material';
import PannelComponent from '@/Components/mindmap/PannelComponent';
import Sidebar from '@/Components/Sidebar';
import { getLayoutedElements } from '@/utils/mindmapUtils/layoutDagre';
import { parseJsonToNodesEdges } from '@/utils/mindmapUtils/transformJsonToFlow';
import { edgeTypes, nodeTypes } from "@/constants/flowTypes";
import { useMindmapVisibility } from "@/hooks/useMindmapVisibility";




function Workflow() {
  const { nodes: parsedNodes, edges: parsedEdges } = parseJsonToNodesEdges(jsonData);
  const layouted = getLayoutedElements(parsedNodes, parsedEdges);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(layouted.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layouted.edges);


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
  }, []);


  // Toggle children visibility
  const {
  filteredEdges,
  filteredNodes,
} = useMindmapVisibility(nodes, edges);

  return (
    <Grid container >
      <Grid sx={{ border: "1px solid black", height: "100vh", width: "75%", position: "relative", bgcolor: "white", display: "flex", justifyContent: 'center', alignItems: "center" }} >
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
      <Grid sx={{ border: "1px solid black", width: "25%" }}>
        <Sidebar />
        </Grid>
    </Grid>



  )
}

export default Workflow