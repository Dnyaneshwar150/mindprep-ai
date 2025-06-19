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
  { label: 'Question', type: 'questionNode' },
  { label: 'Answer', type: 'answerNode' },
  { label: 'Main Point Heading', type: 'mainPointHeadingNode' },
  { label: 'Main Point', type: 'mainPointNode' },
  { label: 'Sub Point', type: 'subPointNode' },
  { label: 'Explanation', type: 'explanationNode' },
];

export const typePrefixMap: Record<string, string> = {
  questionNode: 'q',
  answerNode: 'a',
  mainPointHeadingNode: 'mph',
  mainPointNode: 'mp',
  subPointNode: 'sp',
  explanationNode: 'exp',
  default: 'nn',
};