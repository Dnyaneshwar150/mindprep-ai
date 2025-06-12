import { ComponentType } from "@/types";
import { Edge, Node } from "@xyflow/react";

export const initialNodes:Node[] = [
  {
    id:"1",
    position:{x:100 , y: 100},
    type:"genericNodeComponent",
    data:{type:ComponentType.Question , value:"nhdsikfsdfidsiodfiodi"}
  },
   {
    id:"2",
    position:{x:100 , y: 200},
    type:"genericNodeComponent",
    data:{type:ComponentType.Answer , value:"nhdsikffsdfdfsdfidsiodfiodi"}
  }
]


export const initialEdges:Edge[] = [

]