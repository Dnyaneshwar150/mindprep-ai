// utils/getLayoutedElements.ts
import dagre from "dagre";
import { Node, Edge } from "@xyflow/react";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 300;
const nodeHeight = 80;

export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  direction?: "TB" | "LR",
): { nodes: Node[]; edges: Edge[] } {
  const computedDirection =
    direction ??
    (typeof window !== "undefined" && window.innerWidth < 768 ? "TB" : "LR");

  dagreGraph.setGraph({ rankdir: computedDirection });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
}
