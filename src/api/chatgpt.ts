import { cleanChatGptJson } from "@/utils/mindmapUtils/mindmapCommonUtils.ts/mindmapCommonUtils";

export async function fetchStructuredAnswer(question: string ,mainPointCount:number,subPointCount:number) {
       const API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY

         const Updatedprompt = `
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
                    "source": "URL or source text"
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

Generate ${mainPointCount} mainPointHeadings, each with 1 mainPoint and ${subPointCount} subPoints. Use this question: "${question}"`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://yourdomain.com", // Optional: used by OpenRouter for tracking
      "X-Title": "YourAppName",                // Optional: used for OpenRouter model leaderboard
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1-0528:free",
      messages: [
        {
          role: "user",
          content: Updatedprompt,
        },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.statusText}`);
  }

  const data = await response.json();

 if (data?.choices?.[0]?.message?.content) {
  const raw = data.choices[0].message.content;

  const cleaned = cleanChatGptJson(raw);

  if (!cleaned) {
    console.warn("GPT response was not valid JSON even after cleaning.");
    return raw; // fallback to raw if needed
  }

  return cleaned; // this is a parsed object of type `Data`
}

}
