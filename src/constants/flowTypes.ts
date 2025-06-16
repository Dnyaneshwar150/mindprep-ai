import AnswerNode from "@/Components/mindmap/nodes/AnswerNode";
import ExplanationNode from "@/Components/mindmap/nodes/ExplanationNode";
import MainPointHeadingNode from "@/Components/mindmap/nodes/MainPointHeadingNode";
import MainPointNode from "@/Components/mindmap/nodes/MainPointNode";
import QuestionNode from "@/Components/mindmap/nodes/QuestionNode";
import SubPointNode from "@/Components/mindmap/nodes/SubPointNode";
import Wire from "@/Components/mindmap/Wire";
import { NodeTypes } from "@xyflow/react";

export const nodeTypes: NodeTypes = {
  questionNode: QuestionNode,
  answerNode: AnswerNode,
  mainPointHeadingNode: MainPointHeadingNode, // Register new node types
  mainPointNode: MainPointNode,
  subPointNode: SubPointNode,
  explanationNode: ExplanationNode,
};

export const edgeTypes = {
  wire: Wire,
}