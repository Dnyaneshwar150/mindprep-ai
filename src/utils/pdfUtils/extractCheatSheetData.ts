import { Data } from "@/types/mindmapData.types";

interface ExplanationBlock {
  subpoint: string;
  explanation: string;
  source?: string;
}

export function extractCheatSheetDataFromRaw(rawJson: Data | null) {
  const question = rawJson?.question?.label || "No question";
  const answer = rawJson?.question?.answer?.label || "No answer";

  const explanations: ExplanationBlock[] = [];

  rawJson?.question?.answer?.mainPointHeadings?.forEach((heading) => {
    heading.mainPoints?.forEach((mainPoint) => {
      mainPoint.subPoints?.forEach((sub) => {
        if (sub.explanation?.label) {
          explanations.push({
            subpoint: sub.label,
            explanation: sub.explanation.label,
            source: sub.explanation.source,
          });
        }
      });
    });
  });

  return { question, answer, explanations };
}
