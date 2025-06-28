import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGptData } from "../chatgpt";
import mockData from "../../app/Workflow/mockData.json";
const USE_MOCK_DATA = true;

export const fetchMindmapFromGPT = createAsyncThunk(
  "mindmap/fetchFromGPT",
  async ({
    question,
    mainPointCount,
    subPointCount,
    subject,
    instructions,
  }: {
    question: string;
    mainPointCount: number;
    subPointCount: number;
    subject: string;
    instructions: string;
  }) => {
    if (USE_MOCK_DATA) {
      return {
        question: mockData.question.label,
        data: mockData,
      };
    }

    const mindmapPrompt = `
You are an assistant that returns a **raw JSON object only**. Do not wrap it in \`\`\`json or \`\`\`, do not include any explanation or extra text — return only valid, parsable JSON.

Return it in the following format:
{
  "question": {
    "id": "q1",
    "label": "QUESTION_TEXT",
    "answer": {
      "id": "a1",
      "label": "Short answer in 25 words",
      "mainPointHeadings": [
        {
          "id": "mph1",
          "label": "Main point heading",
          "mainPoints": [
            {
              "id": "mp1",
              "label": "Main point",
              "subPoints": [
                {
                  "id": "sp1",
                  "label": "Subpoint",
                  "explanation": {
                    "id": "exp1",
                    "label": "Explanation",
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

Generate ${mainPointCount} mainPointHeadings, each with 1 mainPoint and ${subPointCount} subPoints.
Use this subject: "${subject}"
Additional instructions (if any): "${instructions}"
Use this question: "${question}"
`;

    const data = await fetchGptData(mindmapPrompt, true); // 🧼 JSON cleanup expected
    return { question, data };
  },
);
