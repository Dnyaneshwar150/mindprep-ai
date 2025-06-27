import { fetchGptData } from "../chatgpt";

export async function fetchExplanationFromGPT(
  label: unknown,
  instructions: string,
): Promise<string> {
  const prompt = `Explain this concept in simple terms (3–4 sentences): "${label}". ${
    instructions ? `Additional instructions: ${instructions}` : ""
  }`;

  try {
    const explanation = await fetchGptData(prompt);
    return explanation;
  } catch (error) {
    console.error("Failed to fetch explanation:", error);
    return "❌ Failed to fetch explanation.";
  }
}
