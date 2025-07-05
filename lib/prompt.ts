//All function  prompts here

import { PromptParams } from "./types";

export function mindmapPrompt({
  question,
  subject,
  mainPointCount,
  subPointCount,
  instructions,
}: PromptParams): string {
  return `
You are an AI assistant. Your task is to return a strictly valid JSON object (no markdown, no triple backticks, no explanation). Only return valid JSON that can be parsed.

⚠️ STRICT RULES:
- Return ONLY the JSON object (no extra text).
- Do NOT wrap the output in \`\`\` or any formatting.
- The JSON must start with '{' and end with '}'.
-DO NOT include:
  - Any sources, citations, URLs, book references, or phrases like "according to".
  - Any fields or keys named "source", "citation", "ref", or similar — even if they are null, empty, or "undefined".


📦 JSON STRUCTURE AND RULES:
{
  "question": {
    "id": "q1",
    "label": "The original question text.",
    "answer": {
      "id": "a1",
      "label": "A clear and simple explanation or definition of the question.",
      "mainPointHeadings": [
        {
          "id": "mph1",
          "label": "A specific topic or angle of the subject (one sentence).",
          "mainPoints": [
            {
              "id": "mp1",
              "label": "The main idea or explanation related to this heading.",
              "subPoints": [
                {
                  "id": "sp1",
                  "label": "A supporting detail or fact (1 sentence).",
                  "explanation": {
                    "id": "exp1",
                    "label": "A detailed explanation of the sub-point. and dont add sources Here"
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  }
}

Use the following input:
- Subject: "${subject}"
- Question: "${question}"
- Include exactly ${mainPointCount} mainPointHeadings
- Each mainPointHeading must have 1 mainPoint
- Each mainPoint must contain ${subPointCount} subPoints
- Each SubPoint must include an explanation

${
  instructions?.trim()
    ? `Also, follow this additional instruction: "${instructions}"`
    : "Make the explanation beginner-friendly and avoid technical jargon. Focus on exam-level theory clarity. Keep explanations concise but complete. Use simple sentences and clear examples where applicable. Format the structure like academic notes that help quick revision."
}

Return ONLY valid JSON (no extra text, no formatting).
`.trim();
}
