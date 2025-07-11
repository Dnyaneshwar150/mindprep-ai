// src/initial-elements.ts
import { ComponentType } from "@/types/mindmap.types";
import { Edge, Node } from "@xyflow/react";

export const initialNodes: Node[] = [
  // Question (Start on the left)
  {
    id: "q1",
    position: { x: 50, y: 350 }, // Starting point
    type: "questionNode",
    data: {
      type: ComponentType.Question,
      label: "What are the key principles of effective time management?",
    },
  },

  // Answer (To the right of the question)
  {
    id: "a1",
    position: { x: 350, y: 350 }, // Further right
    type: "answerNode",
    data: {
      type: ComponentType.Answer,
      label:
        "Effective time management involves prioritizing tasks, setting clear goals, and avoiding distractions.",
    },
  },

  // Main Point Headings (To the right of the Answer, spread vertically)
  {
    id: "mph1_1",
    position: { x: 650, y: 100 }, // Top-most heading
    type: "mainPointHeadingNode",
    data: { type: ComponentType.MainPointHeading, label: "I. Prioritization Techniques" },
  },
  {
    id: "mph1_2",
    position: { x: 650, y: 300 }, // Second heading
    type: "mainPointHeadingNode",
    data: { type: ComponentType.MainPointHeading, label: "II. Goal Setting & Planning" },
  },
  {
    id: "mph1_3",
    position: { x: 650, y: 500 }, // Third heading
    type: "mainPointHeadingNode",
    data: { type: ComponentType.MainPointHeading, label: "III. Minimizing Distractions" },
  },
  {
    id: "mph1_4",
    position: { x: 650, y: 700 }, // Bottom-most heading
    type: "mainPointHeadingNode",
    data: { type: ComponentType.MainPointHeading, label: "IV. Tools & Strategies" },
  },

  // --- Branch 1: Prioritization Techniques ---
  // Main Points under MPH1
  {
    id: "mp1_1_1",
    position: { x: 950, y: 50 }, // Right of MPH1
    type: "mainPointNode",
    data: { type: ComponentType.MainPoint, label: "Use the Eisenhower Matrix" },
  },
  {
    id: "mp1_1_2",
    position: { x: 950, y: 150 }, // Right of MPH1, below first point
    type: "mainPointNode",
    data: { type: ComponentType.MainPoint, label: "Apply the Pareto Principle (80/20 Rule)" },
  },
  // Sub-Point under mp1_1_1
  {
    id: "sp1_1_1_1",
    position: { x: 1250, y: 50 }, // Right of mp1_1_1
    type: "subPointNode",
    data: { type: ComponentType.SubPoint, label: "Categorize tasks by urgency and importance" },
  },
  // Explanation for sp1_1_1_1
  {
    id: "exp1_1_1_1",
    position: { x: 1500, y: 50 }, // Right of sp1_1_1_1
    type: "explanationNode",
    data: {
      type: ComponentType.Explanation,
      label: "Focuses on high-impact activities first.",
      source: "https://example.com/eisenhower",
    },
  },

  // --- Branch 2: Goal Setting & Planning ---
  // Main Points under MPH2
  {
    id: "mp1_2_1",
    position: { x: 950, y: 250 },
    type: "mainPointNode",
    data: { type: ComponentType.MainPoint, label: "Set SMART Goals" },
  },
  {
    id: "mp1_2_2",
    position: { x: 950, y: 350 },
    type: "mainPointNode",
    data: { type: ComponentType.MainPoint, label: "Create a Daily Schedule" },
  },
  // Sub-Point under mp1_2_1
  {
    id: "sp1_2_1_1",
    position: { x: 1250, y: 250 },
    type: "subPointNode",
    data: {
      type: ComponentType.SubPoint,
      label: "Specific, Measurable, Achievable, Relevant, Time-bound",
    },
  },
  // Explanation for sp1_2_1_1
  {
    id: "exp1_2_1_1",
    position: { x: 1500, y: 250 },
    type: "explanationNode",
    data: {
      type: ComponentType.Explanation,
      label: "Clarity and focus, increasing success rates.",
      source: "https://example.com/smart-goals",
    },
  },

  // --- Branch 3: Minimizing Distractions ---
  // Main Points under MPH3
  {
    id: "mp1_3_1",
    position: { x: 950, y: 450 },
    type: "mainPointNode",
    data: { type: ComponentType.MainPoint, label: "Implement the Pomodoro Technique" },
  },
  {
    id: "mp1_3_2",
    position: { x: 950, y: 550 },
    type: "mainPointNode",
    data: { type: ComponentType.MainPoint, label: "Batch Similar Tasks" },
  },
  // Sub-Point under mp1_3_1
  {
    id: "sp1_3_1_1",
    position: { x: 1250, y: 450 },
    type: "subPointNode",
    data: { type: ComponentType.SubPoint, label: "Work in focused 25-minute intervals" },
  },
  // Explanation for sp1_3_1_1
  {
    id: "exp1_3_1_1",
    position: { x: 1500, y: 450 },
    type: "explanationNode",
    data: {
      type: ComponentType.Explanation,
      label: "Improves concentration and prevents burnout.",
      source: "https://example.com/pomodoro",
    },
  },

  // --- Branch 4: Tools & Strategies ---
  // Main Points under MPH4
  {
    id: "mp1_4_1",
    position: { x: 950, y: 650 },
    type: "mainPointNode",
    data: { type: ComponentType.MainPoint, label: "Utilize Task Management Apps" },
  },
  {
    id: "mp1_4_2",
    position: { x: 950, y: 750 },
    type: "mainPointNode",
    data: { type: ComponentType.MainPoint, label: "Review and Adapt Regularly" },
  },
  // Sub-Point under mp1_4_1
  {
    id: "sp1_4_1_1",
    position: { x: 1250, y: 650 },
    type: "subPointNode",
    data: { type: ComponentType.SubPoint, label: "Trello, Asana, Notion, Todoist" },
  },
  // Explanation for sp1_4_1_1
  {
    id: "exp1_4_1_1",
    position: { x: 1500, y: 650 },
    type: "explanationNode",
    data: {
      type: ComponentType.Explanation,
      label: "Digital tools help organize, track progress, and collaborate.",
      source: "https://example.com/apps",
    },
  },
];

export const initialEdges: Edge[] = [
  // Question to Answer
  {
    id: "e-q1-a1",
    source: "q1",
    target: "a1",
    sourceHandle: "question-answer-handle", // Assuming QuestionNode handle on Right
    targetHandle: "answer-from-question", // Assuming AnswerNode handle on Left
    type: "smoothstep",
    animated: true,
  },

  // --- Answer to Main Point Headings ---
  // Assuming AnswerNode has a right handle and MPHs have left handles
  {
    id: "e-a1-mph1_1",
    source: "a1",
    target: "mph1_1",
    sourceHandle: "answer-to-main-point-heading",
    targetHandle: "heading-from-answer",
    type: "smoothstep",
  },
  {
    id: "e-a1-mph1_2",
    source: "a1",
    target: "mph1_2",
    sourceHandle: "answer-to-main-point-heading",
    targetHandle: "heading-from-answer",
    type: "smoothstep",
  },
  {
    id: "e-a1-mph1_3",
    source: "a1",
    target: "mph1_3",
    sourceHandle: "answer-to-main-point-heading",
    targetHandle: "heading-from-answer",
    type: "smoothstep",
  },
  {
    id: "e-a1-mph1_4",
    source: "a1",
    target: "mph1_4",
    sourceHandle: "answer-to-main-point-heading",
    targetHandle: "heading-from-answer",
    type: "smoothstep",
  },

  // --- Main Point Heading 1 to Main Points ---
  {
    id: "e-mph1_1-mp1_1_1",
    source: "mph1_1",
    target: "mp1_1_1",
    sourceHandle: "heading-to-main-point", // Assuming MPH has right handle
    targetHandle: "main-point-from-heading", // Assuming MainPoint has left handle
    type: "smoothstep",
  },
  {
    id: "e-mph1_1-mp1_1_2",
    source: "mph1_1",
    target: "mp1_1_2",
    sourceHandle: "heading-to-main-point",
    targetHandle: "main-point-from-heading",
    type: "smoothstep",
  },
  // --- Main Point 1.1.1 to Sub-Point ---
  {
    id: "e-mp1_1_1-sp1_1_1_1",
    source: "mp1_1_1",
    target: "sp1_1_1_1",
    sourceHandle: "main-point-to-sub-point", // Assuming MainPoint has right handle
    targetHandle: "sub-point-from-main-point", // Assuming SubPoint has left handle
    type: "smoothstep",
  },
  // --- Sub-Point 1.1.1.1 to Explanation ---
  {
    id: "e-sp1_1_1_1-exp1_1_1_1",
    source: "sp1_1_1_1",
    target: "exp1_1_1_1",
    sourceHandle: "sub-point-to-explanation", // Assuming SubPoint has right handle
    targetHandle: "explanation-from-sub-point", // Assuming Explanation has left handle
    type: "smoothstep",
  },

  // --- Main Point Heading 2 to Main Points ---
  {
    id: "e-mph1_2-mp1_2_1",
    source: "mph1_2",
    target: "mp1_2_1",
    sourceHandle: "heading-to-main-point",
    targetHandle: "main-point-from-heading",
    type: "smoothstep",
  },
  {
    id: "e-mph1_2-mp1_2_2",
    source: "mph1_2",
    target: "mp1_2_2",
    sourceHandle: "heading-to-main-point",
    targetHandle: "main-point-from-heading",
    type: "smoothstep",
  },
  // --- Main Point 1.2.1 to Sub-Point ---
  {
    id: "e-mp1_2_1-sp1_2_1_1",
    source: "mp1_2_1",
    target: "sp1_2_1_1",
    sourceHandle: "main-point-to-sub-point",
    targetHandle: "sub-point-from-main-point",
    type: "smoothstep",
  },
  // --- Sub-Point 1.2.1.1 to Explanation ---
  {
    id: "e-sp1_2_1_1-exp1_2_1_1",
    source: "sp1_2_1_1",
    target: "exp1_2_1_1",
    sourceHandle: "sub-point-to-explanation",
    targetHandle: "explanation-from-sub-point",
    type: "smoothstep",
  },

  // --- Main Point Heading 3 to Main Points ---
  {
    id: "e-mph1_3-mp1_3_1",
    source: "mph1_3",
    target: "mp1_3_1",
    sourceHandle: "heading-to-main-point",
    targetHandle: "main-point-from-heading",
    type: "smoothstep",
  },
  {
    id: "e-mph1_3-mp1_3_2",
    source: "mph1_3",
    target: "mp1_3_2",
    sourceHandle: "heading-to-main-point",
    targetHandle: "main-point-from-heading",
    type: "smoothstep",
  },
  // --- Main Point 1.3.1 to Sub-Point ---
  {
    id: "e-mp1_3_1-sp1_3_1_1",
    source: "mp1_3_1",
    target: "sp1_3_1_1",
    sourceHandle: "main-point-to-sub-point",
    targetHandle: "sub-point-from-main-point",
    type: "smoothstep",
  },
  // --- Sub-Point 1.3.1.1 to Explanation ---
  {
    id: "e-sp1_3_1_1-exp1_3_1_1",
    source: "sp1_3_1_1",
    target: "exp1_3_1_1",
    sourceHandle: "sub-point-to-explanation",
    targetHandle: "explanation-from-sub-point",
    type: "smoothstep",
  },

  // --- Main Point Heading 4 to Main Points ---
  {
    id: "e-mph1_4-mp1_4_1",
    source: "mph1_4",
    target: "mp1_4_1",
    sourceHandle: "heading-to-main-point",
    targetHandle: "main-point-from-heading",
    type: "smoothstep",
  },
  {
    id: "e-mph1_4-mp1_4_2",
    source: "mph1_4",
    target: "mp1_4_2",
    sourceHandle: "heading-to-main-point",
    targetHandle: "main-point-from-heading",
    type: "smoothstep",
  },
  // --- Main Point 1.4.1 to Sub-Point ---
  {
    id: "e-mp1_4_1-sp1_4_1_1",
    source: "mp1_4_1",
    target: "sp1_4_1_1",
    sourceHandle: "main-point-to-sub-point",
    targetHandle: "sub-point-from-main-point",
    type: "smoothstep",
  },
  // --- Sub-Point 1.4.1.1 to Explanation ---
  {
    id: "e-sp1_4_1_1-exp1_4_1_1",
    source: "sp1_4_1_1",
    target: "exp1_4_1_1",
    sourceHandle: "sub-point-to-explanation",
    targetHandle: "explanation-from-sub-point",
    type: "smoothstep",
  },
];
