'use client'
import Wire from '@/Components/Wire';
import { initialEdges, initialNodes } from '@/constants';
import "@xyflow/react/dist/style.css";
import Grid from '@mui/material/Grid'
import { Background, BackgroundVariant, ReactFlow, useNodesState, useEdgesState, ConnectionMode, Connection, MarkerType, NodeTypes } from '@xyflow/react'
import React, { useCallback } from 'react'
import { v4 as uuid } from "uuid";
import QuestionNode from '@/Components/nodes/QuestionNode';
import AnswerNode from '@/Components/nodes/AnswerNode';
import MainPointHeadingNode from '@/Components/nodes/MainPointHeadingNode';
import MainPointNode from '@/Components/nodes/MainPointNode';
import SubPointNode from '@/Components/nodes/SubPointNode';
import ExplanationNode from '@/Components/nodes/ExplanationNode';


const nodeTypes: NodeTypes = {
  questionNode: QuestionNode,
  answerNode: AnswerNode,
  mainPointHeadingNode: MainPointHeadingNode, // Register new node types
  mainPointNode: MainPointNode,
  subPointNode: SubPointNode,
  explanationNode: ExplanationNode,
};

const edgeTypes = {
  wire:Wire,
}

function Workflow() {


    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((connection:Connection) => {
        const edge = {
          ...connection,
          type:'wire',
          markerEnd:{
            type:MarkerType.ArrowClosed,
            height:20,
            width:20,
            color:"#A9A9A9"
          },
          id:uuid(),
        }
        setEdges((eds) => eds.concat(edge))
    },[])

    return (
        <Grid container sx={{ border: "1px solid black", height: "100vh", width: "200vh", position: "relative", bgcolor: "white" ,display:"flex",justifyContent:'center',alignItems:"center" }} >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                connectionMode={ConnectionMode.Loose}
                nodeTypes={nodeTypes}
                fitView
                edgeTypes={edgeTypes}
            >
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={100}
                    color="#AA4A44"
                    id="1"
                />
                {/* <Controls /> */}
            </ReactFlow>
        </Grid>

    )
}

export default Workflow