import { cleanChatGptJson } from "@/utils/mindmapUtils/mindmapCommonUtils.ts/mindmapCommonUtils";
import { logger } from "./logger";

// const API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY!;
const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY!;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";
// const API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function fetchData(prompt: string, shouldCleanJson = false) {
  logger.info("fetchData called", { promptSnippet: prompt.slice(0, 50) });

  try {
    // const response = await fetch(API_URL, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${API_KEY}`,
    //     "Content-Type": "application/json",
    //     "HTTP-Referer": "https://yourdomain.com",
    //     "X-Title": "MindmapApp",
    //   },
    //   body: JSON.stringify({
    //     model: "deepseek/deepseek-r1-0528:free",
    //     messages: [{ role: "user", content: prompt }],
    //     temperature: 0.7,
    //   }),
    // });

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5, // Lower temp for consistent formatting
      }),
    });

    logger.info("API response received", { status: response.status });

    if (!response.ok) {
      logger.error("Deepseek API error", {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Deepseek API error: ${response.statusText}`);
    }

    const data = await response.json();
    const rawOutput = data?.choices?.[0]?.message?.content;

    if (!rawOutput) {
      logger.error("Deepseek response was empty.");
      throw new Error("Deepseek response was empty.");
    }

    if (shouldCleanJson) {
      const cleaned = cleanChatGptJson(rawOutput);
      logger.info("JSON cleaned successfully");
      return cleaned || rawOutput;
    }

    logger.info("fetchData completed successfully");
    return rawOutput;
  } catch (error) {
    logger.error("Error in fetchData", { error });
    throw error;
  }
}
