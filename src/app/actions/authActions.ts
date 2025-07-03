// actions/auth.ts
"use server";

import { connectDB } from "../../../lib/connectDB";
import { User } from "../../../models/User";
import bcrypt from "bcrypt";

export async function createUserIfNotExist(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  await connectDB();

  let user = await User.findOne({ email });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      email,
      password: hashedPassword,
      provider: "credentials",
    });
  }

  return { success: true };
}
