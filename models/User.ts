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
    type: String,
    required: true,
    default: "credentials",
  },
  providerId: {
    type: String,
    unique: true,
    sparse: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = models.User || model("User", userSchema);
