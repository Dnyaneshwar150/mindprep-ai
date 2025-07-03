// lib/openai.ts

import { PromptParams } from "./types";
import { fetchGptDataBackend } from "./fetchGptData";
import { mindmapPrompt } from "./prompt";

export async function generateFromOpenAI(params: PromptParams) {
  const prompt = mindmapPrompt(params);

  const raw = await fetchGptDataBackend(prompt, true); // ✅ using your custom DeepSeek API

  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return parsed;
  } catch {
    throw new Error("Failed to parse GPT response as JSON.");
  }
}
