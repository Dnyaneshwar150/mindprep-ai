import { Data } from "@/types/mindmapData.types";
import { Edge, Node } from "@xyflow/react";

let x = 50;
let y = 350;
const xGap = 300;
const yGap = 150;

export function parseJsonToNodesEdges(data: Data): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  function addNode(id: string, label: string, nodeType: string, parentId?: string) {
    const node: Node = {
      id,
      data: { type: nodeType, label },
      position: { x, y },
      type: nodeType,
    };
    nodes.push(node);

    if (parentId) {
      edges.push({ id: `${parentId}-${id}`, source: parentId, target: id, type: "wire" });
    }

    y += yGap;
  }

  const question = data.question;

  x = 50;
  y = 350;
  addNode(question.id, question.label, "questionNode");

  const answer = question.answer;
  x += xGap;
  y = 350;
  addNode(answer.id, answer.label, "answerNode", question.id);

  for (const mph of answer.mainPointHeadings) {
    x += xGap;
    const mphY = y;
    addNode(mph.id, mph.label, "mainPointHeadingNode", answer.id);

    for (const mp of mph.mainPoints) {
      x += xGap;
      addNode(mp.id, mp.label, "mainPointNode", mph.id);

      if (mp.subPoints) {
        for (const sp of mp.subPoints) {
          x += xGap;
          addNode(sp.id, sp.label, "subPointNode", mp.id);

          if (sp.explanation) {
            x += xGap;
            const explanationText = `${sp.explanation.label} (source: ${sp.explanation.source})`;
            addNode(sp.explanation.id, explanationText, "explanationNode", sp.id);
            x -= xGap;
          }
          x -= xGap;
        }
      }

      x -= xGap;
      y += yGap;
    }

    x -= xGap;
    y = mphY + yGap;
  }

  return { nodes, edges };
}
