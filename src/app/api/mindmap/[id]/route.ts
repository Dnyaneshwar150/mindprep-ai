import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { MindmapModel } from "@/app/models/Mindmap";
import { authOptions } from "@/app/register/lib/authOptions";
import { connectDB } from "@/app/register/lib/mongodb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const map = await MindmapModel.findOne({
    _id: params.id,
    userId: session.user.email,
  });

  if (!map) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(map);
}
