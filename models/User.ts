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
    // For OAuth providers like Google
    type: String,
  },
  image: {
    // For OAuth providers like Google (profile picture URL)
    type: String,
  },
  provider: {
    // To distinguish credential users from OAuth users
    type: String, // e.g., "google", "credentials"
    required: true,
    default: "credentials", // Default to credentials if not specified
  },
  providerId: {
    // Store the unique ID from the OAuth provider (e.g., Google's sub)
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
