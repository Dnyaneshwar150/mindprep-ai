// models/User.ts
import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function (this: { provider?: string }) {
      return this.provider === "credentials";
    },
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  provider: {
    type: String, // e.g., "google", "credentials"
    required: true,
    default: "credentials", // Default to credentials if not specified
  },
  providerId: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple nulls but unique for non-null values
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = models.User || model("User", userSchema);
