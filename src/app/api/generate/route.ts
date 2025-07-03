// app/api/generate/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PromptParams } from "../../../../lib/types";
import { generateFromOpenAI } from "../../../../lib/openai";
import { logger } from "../../../../lib/logger";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PromptParams;

    logger.debug(`Received Prompt Params: ${JSON.stringify(body)}`);

    const data = await generateFromOpenAI(body);

    logger.info(`✅ Mindmap generated for question: "${body.question}"`);

    return NextResponse.json({ question: body.question, data });
  } catch (error) {
    logger.error(`❌ Error in /api/generate: ${error}`);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
