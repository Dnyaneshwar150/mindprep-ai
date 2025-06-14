'use client'
import Wire from '@/Components/Wire';
// import { initialEdges, initialNodes } from '@/constants';
import "@xyflow/react/dist/style.css";
import { Background, BackgroundVariant, ReactFlow, useNodesState, useEdgesState, ConnectionMode, Connection, MarkerType, NodeTypes, Panel, Controls } from '@xyflow/react'
import React, { useCallback, useMemo, useState } from 'react'
import { v4 as uuid } from "uuid";
import QuestionNode from '@/Components/nodes/QuestionNode';
import AnswerNode from '@/Components/nodes/AnswerNode';
import MainPointHeadingNode from '@/Components/nodes/MainPointHeadingNode';
import MainPointNode from '@/Components/nodes/MainPointNode';
import SubPointNode from '@/Components/nodes/SubPointNode';
import ExplanationNode from '@/Components/nodes/ExplanationNode';
import { getLayoutedElements } from '@/utils/getLayoutedElements';
import jsonData from '../Workflow/mockData.json'
import { parseJsonToNodesEdges } from './jsonFLow';
import { Grid } from '@mui/material';
import PannelComponent from '@/Components/PannelComponent';
import Sidebar from '@/Components/Sidebar';


const nodeTypes: NodeTypes = {
  questionNode: QuestionNode,
  answerNode: AnswerNode,
  mainPointHeadingNode: MainPointHeadingNode, // Register new node types
  mainPointNode: MainPointNode,
  subPointNode: SubPointNode,
  explanationNode: ExplanationNode,
};

const edgeTypes = {
  wire: Wire,
}

function Workflow() {
  const { nodes: parsedNodes, edges: parsedEdges } = parseJsonToNodesEdges(jsonData);
  const layouted = getLayoutedElements(parsedNodes, parsedEdges);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(layouted.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layouted.edges);

  const [visibleChildrenMap, setVisibleChildrenMap] = useState<Record<string, boolean>>({});

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
  const handleToggleChildrenVisibility = useCallback((nodeId: string) => {
    setVisibleChildrenMap(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  }, []);

  // Enhance node data with handlers + isExpanded state
  const enhancedNodes = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        nodeId: node.id,
        areChildrenVisible: visibleChildrenMap[node.id] ?? true,
        onToggleChildrenVisibility: handleToggleChildrenVisibility,
      },
    }));
  }, [nodes, visibleChildrenMap]);

  // Filter edges and hidden children
  const filteredEdges = useMemo(() => {
    return edges.filter(edge => {
      const parentHiddenChildren = visibleChildrenMap[edge.source] === false;
      return !parentHiddenChildren;
    });
  }, [edges, visibleChildrenMap]);

  // const visibleNodeIds = new Set(filteredEdges.flatMap(edge => [edge.source, edge.target]));
  const filteredNodes = useMemo(() => {
    // Step 1: Build parent map
    const parentMap = new Map<string, string>();
    edges.forEach(edge => {
      parentMap.set(edge.target, edge.source);
    });

    // Step 2: Check ancestors recursively
    const isVisible = (nodeId: string): boolean => {
      let currentId = nodeId;
      while (parentMap.has(currentId)) {
        const parentId = parentMap.get(currentId)!;
        if (visibleChildrenMap[parentId] === false) return false;
        currentId = parentId;
      }
      return true;
    };

    // Step 3: Filter only visible nodes
    return enhancedNodes.filter(node => isVisible(node.id));
  }, [enhancedNodes, visibleChildrenMap, edges]);

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