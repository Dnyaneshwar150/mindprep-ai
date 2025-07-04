//This is generate file where multiple generate which get params add prompt and  fetch data

import { PromptParams } from "./types";
import { fetchData } from "./fetchData";
import { mindmapPrompt } from "./prompt";

export async function generateMindMap(params: PromptParams) {
  const prompt = mindmapPrompt(params);

  const raw = await fetchData(prompt, true);

  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return parsed;
  } catch {
    throw new Error("Failed to parse GPT response as JSON.");
  }
}
