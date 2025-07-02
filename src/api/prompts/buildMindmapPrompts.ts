import { createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchGptData } from "../chatgpt";
// import { fetchGroqData } from "./groq";
import { fetchMindmapWithFallback } from "../fetchMindmapWithFallback";
// import mockData from "../../app/Workflow/mockData.json";
// const USE_MOCK_DATA = true;

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
    // if (USE_MOCK_DATA) {
    //   return {
    //     question: mockData.question.label,
    //     data: mockData,
    //   };
    // }

    const mindmapPrompt = `
You are an AI assistant. Your task is to return a strictly valid JSON object (no markdown, no triple backticks, no explanation). Only return valid JSON that can be parsed.

⚠️ VERY IMPORTANT:
- Do not include any introductory text.
- Do not wrap the response with \`\`\` or \`\`\`json.
- Return only the object, starting with { and ending with }.

📦 JSON STRUCTURE EXAMPLE (Engineering):
{
  "question": {
    "id": "q1",
    "label": "What is Ohm's Law?",
    "answer": {
      "id": "a1",
      "label": "Ohm's Law states that the current through a conductor is directly proportional to the voltage across it.",
      "mainPointHeadings": [
        {
          "id": "mph1",
          "label": "Definition",
          "mainPoints": [
            {
              "id": "mp1",
              "label": "Ohm's Law formula",
              "subPoints": [
                {
                  "id": "sp1",
                  "label": "Formula: V = IR",
                  "explanation": {
                    "id": "exp1",
                    "label": "Voltage (V) equals current (I) times resistance (R)."
                  }
                },
                {
                  "id": "sp2",
                  "label": "Unit of Resistance",
                  "explanation": {
                    "id": "exp2",
                    "label": "The unit of resistance is Ohms (Ω)."
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

Now generate JSON using the following:
- Use this subject: "${subject}"
- Question: "${question}"
- Add ${mainPointCount} mainPointHeadings
- Each heading must contain 1 mainPoint
- Each mainPoint must have ${subPointCount} subPoints
- Each SubPoint must contain an explanation

${
  instructions?.trim()
    ? `Also, follow this additional instruction: "${instructions}"`
    : "No additional instructions"
}

Return ONLY valid parsable JSON (no extra text).
`;

    // const data = await fetchGptData(mindmapPrompt, true); // 🧼 JSON cleanup expected
    // const data = await fetchGroqData(mindmapPrompt, true); // 🧼 JSON cleanup expected
    const data = await fetchMindmapWithFallback(mindmapPrompt);
    return { question, data };
  },
);
