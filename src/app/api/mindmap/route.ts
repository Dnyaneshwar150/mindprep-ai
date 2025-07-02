import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { connectDB } from "@/app/lib/mongodb";
import { MindmapModel } from "@/app/models/Mindmap";
import { getUserMindmaps } from "@/app/lib/mindMapUtils";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const mindmaps = await getUserMindmaps(session.user.email);
  return NextResponse.json(mindmaps);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  await connectDB();

  const body = await req.json();
  const { question, nodes, edges } = body;

  if (!question || !Array.isArray(nodes) || !Array.isArray(edges)) {
    return new Response(JSON.stringify({ error: "Invalid data" }), {
      status: 400,
    });
  }

  // Save or update user's mind map
  await MindmapModel.create({
    userId: session.user.email,
    title: question, // user-defined
    question,
    nodes,
    edges,
  });

  return Response.json({ message: "Mind map saved successfully" });
}
