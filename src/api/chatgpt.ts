import { cleanChatGptJson } from "@/utils/mindmapUtils/mindmapCommonUtils.ts/mindmapCommonUtils";

const API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY!;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function fetchGptData(prompt: string, shouldCleanJson = false) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://yourdomain.com",
      "X-Title": "MindmapApp",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1-0528:free",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`GPT API error: ${response.statusText}`);
  }

  const data = await response.json();
  const rawOutput = data?.choices?.[0]?.message?.content;

  if (!rawOutput) throw new Error("GPT response was empty.");

  if (shouldCleanJson) {
    const cleaned = cleanChatGptJson(rawOutput);
    return cleaned || rawOutput;
  }

  return rawOutput;
}
