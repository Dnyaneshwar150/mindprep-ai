// src/types.ts

export enum ComponentType {
  Question = 'question',
  Answer = 'answer',
  MainPointHeading = 'mainPointHeading', // New
  MainPoint = 'mainPoint',             // New
  SubPoint = 'subPoint',               // Existing, but now clearly linked
  Explanation = 'explanation'          // Existing, but now clearly linked
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
  score?: number; // Example: for grading an answer
};

export type MainPointHeadingNodeData = BaseNodeData & {
  type: ComponentType.MainPointHeading;
};

export type MainPointNodeData = BaseNodeData & {
  type: ComponentType.MainPoint;
};

export type SubPointNodeData = BaseNodeData & {
  type: ComponentType.SubPoint;
};

export type ExplanationNodeData = BaseNodeData & {
  type: ComponentType.Explanation;
  source?: string; // e.g., a URL or book reference
};