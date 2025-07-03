import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/connectDB";
import { MindmapModel } from "../../../../../models/Mindmap";
import { auth } from "../../../../../auth";
import { logger } from "../../../../../lib/logger";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: number }> },
) {
  logger.info("🟢 [GET] /api/mindmap/:id called");

  const session = await auth();

  if (!session || !session.user?.email) {
    logger.warn("🟠 Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const mindmapId = (await context.params).id;

  try {
    const map = await MindmapModel.findOne({
      _id: mindmapId,
      userId: session.user.email,
    });

    if (!map) {
      logger.info(`🔍 Mindmap not found for user: ${session.user.email}`);
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    logger.info(`✅ Mindmap found for user: ${session.user.email}`);
    return NextResponse.json(map);
  } catch (error) {
    logger.error(`❌ Failed to fetch mindmap: ${error}`);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
