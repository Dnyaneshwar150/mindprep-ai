import { Schema, model, models } from "mongoose";

const mindmapSchema = new Schema(
  {
    userId: { type: String, required: true }, // session.user.email or session.user.id
    title: { type: String, required: true }, // unique per map or user-defined
    question: String,
    nodes: Array,
    edges: Array,
  },
  { timestamps: true }, // ⬅️ Adds createdAt and updatedAt automatically
);

export const MindmapModel = models.Mindmap || model("Mindmap", mindmapSchema);
