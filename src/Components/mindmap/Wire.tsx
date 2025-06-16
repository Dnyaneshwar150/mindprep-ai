import { BaseEdge, EdgeProps, getSmoothStepPath } from '@xyflow/react'
import React from 'react'

function Wire({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition ,markerEnd }: EdgeProps) {
     const [d] = getSmoothStepPath({
         sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition 
     })
    return (
        <BaseEdge markerEnd={markerEnd} style={{stroke:"black"}}  path={d}/>  //Here we can style to this
    )
}

export default Wire

