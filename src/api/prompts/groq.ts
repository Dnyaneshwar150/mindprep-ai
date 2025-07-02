const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY!;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function fetchGroqData(prompt: string, shouldCleanJson = false) {
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

  if (!response.ok) {
    throw new Error(`GROQ API error: ${response.statusText}`);
  }

  const data = await response.json();
  const rawOutput = data?.choices?.[0]?.message?.content;

  if (!rawOutput) throw new Error("GROQ response was empty.");

  if (shouldCleanJson) {
    const { cleanChatGptJson } = await import(
      "@/utils/mindmapUtils/mindmapCommonUtils.ts/mindmapCommonUtils"
    );
    const cleaned = cleanChatGptJson(rawOutput);
    return cleaned || rawOutput;
  }

  return rawOutput;
}
