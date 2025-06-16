import { Data } from "@/types/mindmapData.types";

export function cleanChatGptJson(input: string): Data | null {

  const cleaned = input
    .trim()
    .replace(/^```json/, '')  // Remove starting ```json
    .replace(/^```/, '')      // Remove starting ``` (if no json)
    .replace(/```$/, '')      // Remove trailing ```
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Failed to parse cleaned JSON:", error);
    return null;
  }
}