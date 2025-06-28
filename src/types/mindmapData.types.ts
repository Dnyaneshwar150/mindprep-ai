export interface Explanation {
  id: string;
  label: string;
  source: string;
}

export interface SubPoint {
  id: string;
  label: string;
  explanation?: Explanation;
}

export interface MainPoint {
  id: string;
  label: string;
  subPoints?: SubPoint[];
}

export interface MainPointHeading {
  id: string;
  label: string;
  mainPoints: MainPoint[];
}

export interface Answer {
  id: string;
  label: string;
  mainPointHeadings: MainPointHeading[];
}

export interface Question {
  id: string;
  label: string;
  answer: Answer;
}

export interface Data {
  question: Question;
}

export const NODE_TYPES = [
  { label: "Main Point Heading", value: "mainPointHeadingNode" },
  { label: "Main Point", value: "mainPointNode" },
  { label: "Sub Point", value: "subPointNode" },
  { label: "Explanation", value: "explanationNode" },
];

export const typePrefixMap: Record<string, string> = {
  questionNode: "q",
  answerNode: "a",
  mainPointHeadingNode: "mph",
  mainPointNode: "mp",
  subPointNode: "sp",
  explanationNode: "exp",
  default: "nn",
};

export const NODE_TYPES_LIST = [
  {
    title: "Main Point Heading",
    type: "mainPointHeadingNode",
    backgroundColor: "var(--background-orange)",
    borderColor: "var(--border-orange)",
  },
  {
    title: "Main Point Explanation",
    type: "mainPointNode",
    backgroundColor: "var(--background-blue)",
    borderColor: "var(--border-blue)",
  },
  {
    title: "SubPoint Heading",
    type: "subPointNode",
    backgroundColor: "var(--background-grey)",
    borderColor: "var(--border-grey)",
  },
  {
    title: "SubPoint Explanation",
    type: "explanationNode",
    backgroundColor: "var(--explantion-background)",
    borderColor: "#ccc",
  },
];
