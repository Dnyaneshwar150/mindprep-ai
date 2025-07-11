import { NextRequest, NextResponse } from "next/server";
import { fetchData } from "../../../../lib/fetchData";
import { logger } from "../../../../lib/logger";

export async function POST(req: NextRequest) {
  try {
    const { label, instructions } = await req.json();

    logger.info("🟢 [POST] /api/explain called");
    logger.debug(`🧠 Prompt input: label="${label}", instructions="${instructions}"`);

    if (!label || typeof label !== "string") {
      logger.warn("⚠️ Missing or invalid label in request");
      return NextResponse.json({ error: "Missing or invalid label" }, { status: 400 });
    }

    const prompt = `Explain this concept in simple terms (3–4 sentences): "${label}".${
      instructions ? ` Additional instructions: ${instructions}` : ""
    }`;

    const explanation = await fetchData(prompt);

    logger.info(`✅ Explanation successfully generated for label: "${label}"`);
    return NextResponse.json({ explanation });
  } catch (error: unknown) {
    logger.error("❌ GPT Explain Error:", error);
    return NextResponse.json({ error: "Failed to generate explanation." }, { status: 500 });
  }
}
