import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/connectDB";
import { MindmapModel } from "../../../../../models/Mindmap";
import { auth } from "../../../../../auth";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: number }> },
) {
  // ✅ not async
  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const mindmapId = (await context.params).id;

  const map = await MindmapModel.findOne({
    _id: mindmapId,
    userId: session.user.email,
  });

  if (!map) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(map);
}
