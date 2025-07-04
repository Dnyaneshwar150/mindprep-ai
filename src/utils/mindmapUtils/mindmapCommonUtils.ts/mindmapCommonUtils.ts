import { Data, typePrefixMap } from "@/types/mindmapData.types";
import { Node } from "@xyflow/react";

export function cleanChatGptJson(input: string): Data | null {
  const cleaned = input
    .trim()
    .replace(/^```json/, "") // Remove starting ```json
    .replace(/^```/, "") // Remove starting ``` (if no json)
    .replace(/```$/, "") // Remove trailing ```
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
  newLabel: string,
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
      : node,
  );
}

export function generateTypeBasedId(nodes: Node[], type: string): string {
  const prefix = typePrefixMap[type] || typePrefixMap.default;

  const maxNumber = nodes
    .filter((node) => node.type === type && node.id.startsWith(prefix))
    .map((node) => parseInt(node.id.replace(prefix, ""), 10))
    .filter((n) => !isNaN(n))
    .reduce((max, n) => Math.max(max, n), 0);

  return `${prefix}${maxNumber + 1}`;
}
