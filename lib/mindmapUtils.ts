import { MindmapModel } from "../models/Mindmap";

export async function getUserMindmaps(userEmail: string) {
  return await MindmapModel.find({ userId: userEmail }, "_id question").sort({
    updatedAt: -1,
  });
}
