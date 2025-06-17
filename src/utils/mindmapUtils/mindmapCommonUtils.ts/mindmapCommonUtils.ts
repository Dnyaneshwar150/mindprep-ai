import { Data } from "@/types/mindmapData.types";
import { Node } from '@xyflow/react';


export function cleanChatGptJson(input: string): Data | null {

  const cleaned = input
    .trim()
    .replace(/^```json/, '')  // Remove starting ```json
    .replace(/^```/, '')      // Remove starting ``` (if no json)
    .replace(/```$/, '')      // Remove trailing ```
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Failed to parse cleaned JSON:", error);
    return null;
  }
}

export function updateLabelInNodeArray(
  nodes: Node[],
  nodeId: string,
  newLabel: string
): Node[] {
  return nodes.map((node) =>
    node.id === nodeId
      ? {
          ...node,
          data: {
            ...node.data,
            label: newLabel,
          },
        }
      : node
  );
}