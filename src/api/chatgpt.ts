export async function fetchStructuredAnswer(prompt: string) {
  console.log("function called");
       const API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY
  console.log(API_KEY);

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
          content: prompt,
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
    try {
      return JSON.parse(data.choices[0].message.content);
    } catch {
      console.warn("Response was not valid JSON. Returning as string.");
      return data.choices[0].message.content;
    }
  } else {
    throw new Error("Invalid response from OpenRouter API");
  }
}
