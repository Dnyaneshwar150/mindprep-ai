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