import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/connectDB";
import { MindmapModel } from "../../../../models/Mindmap";
import { getUserMindmaps } from "../../../../lib/mindmapUtils";
import { auth } from "../../../../auth";
import { logger } from "../../../../lib/logger";

export async function GET() {
  logger.info("🟢 [GET] /api/mindmap called");

  const session = await auth();
  if (!session || !session.user?.email) {
    logger.warn("🟠 Unauthorized GET request to /api/mindmap");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const mindmaps = await getUserMindmaps(session.user.email);
    logger.info(`✅ Fetched mindmaps for user: ${session.user.email}`);
    return NextResponse.json(mindmaps);
  } catch (error) {
    logger.error(`❌ Error in GET /api/mindmap: ${error}`);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  logger.info("🟢 [POST] /api/mindmap called");

  const session = await auth();
  if (!session || !session.user) {
    logger.warn("🟠 Unauthorized POST request to /api/mindmap");
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    await connectDB();

    const body = await req.json();
    const { question, nodes, edges } = body;

    if (!question || !Array.isArray(nodes) || !Array.isArray(edges)) {
      logger.warn("⚠️ Invalid request data in POST /api/mindmap");
      return new Response(JSON.stringify({ error: "Invalid data" }), {
        status: 400,
      });
    }

    await MindmapModel.create({
      userId: session.user.email,
      title: question,
      question,
      nodes,
      edges,
    });

    logger.info(`✅ Mindmap saved for user: ${session.user.email}`);
    return Response.json({ message: "Mind map saved successfully" });
  } catch (error) {
    logger.error(`❌ Error in POST /api/mindmap: ${error}`);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
