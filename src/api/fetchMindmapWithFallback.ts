import { fetchGptData } from "./chatgpt";
import { fetchGroqData } from "./prompts/groq";

export async function fetchMindmapWithFallback(prompt: string) {
  try {
    return await fetchGroqData(prompt, true);
  } catch (groqError) {
    console.warn("GROQ failed, falling back to DeepSeek:", groqError);

    try {
      return await fetchGptData(prompt, true);
    } catch (deepSeekError) {
      console.error("DeepSeek also failed:", deepSeekError);
      throw new Error("Both GROQ and DeepSeek failed to generate a mindmap.");
    }
  }
}
