import React from 'react'
import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { ComponentType, GenericNodeData } from '@/types';
import { Grid, Typography } from '@mui/material';

type GenricComponentNode = Node<GenericNodeData, "string">;

function GenericComponent(
    { data: { value, type }, }:NodeProps<GenricComponentNode>
) {

    return (
        <Grid sx={{position:"relative"  ,border:"1px solid black", width:"200px",backgroundColor:"lightgray" , borderRadius:"10px"}}>
            {type === ComponentType.Question && <Typography>{type}</Typography> }
            {type === ComponentType.Answer && <Typography>{type}</Typography> }
            <Typography variant='subtitle1'>
                {value}
            </Typography>

            <Handle type="source" position={Position.Right} id="right"></Handle>
            <Handle type="source" position={Position.Left} id="left"></Handle>
        </Grid>
    )
}

export default GenericComponent