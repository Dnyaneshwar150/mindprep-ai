// src/types.ts

export enum ComponentType {
  Question = 'questionNode',
  Answer = 'answerNode',
  MainPointHeading = 'mainPointHeadingNode', // New
  MainPoint = 'mainPointNode',             // New
  SubPoint = 'subPointNode',               // Existing, but now clearly linked
  Explanation = 'explanationNode'          // Existing, but now clearly linked
}

// Base data type for all nodes
export type BaseNodeData = {
  label: string; // Used for display text
  type: ComponentType;
  // Any other common properties
};

// Specific data types for each component
export type QuestionNodeData = BaseNodeData & {
  type: ComponentType.Question;
};

export type AnswerNodeData = BaseNodeData & {
  type: ComponentType.Answer;
};
export interface MainPointHeadingNodeData extends Record<string, unknown> {
  type: ComponentType;
  nodeId: string;
  label: string;
  areChildrenVisible: boolean;
  onToggleChildrenVisibility?: (nodeId: string) => void;
}

export type MainPointNodeData = BaseNodeData & {
  type: ComponentType.MainPoint;
};

// export type SubPointNodeData = BaseNodeData & {
//   type: ComponentType.SubPoint;
// };

export interface SubPointNodeData extends Record<string, unknown> {
  type: ComponentType.SubPoint;
  nodeId: string;
  label: string;
  areChildrenVisible: boolean;
  onToggleChildrenVisibility?: (nodeId: string) => void;
}

export type ExplanationNodeData = BaseNodeData & {
  type: ComponentType.Explanation;
  source?: string; // e.g., a URL or book reference
};