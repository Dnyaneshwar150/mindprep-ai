import { User } from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/app/register/lib/mongodb";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await connectDB();

  const userExists = await User.findOne({ email });
  if (userExists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });

  await newUser.save();

  return NextResponse.json({ message: "User registered successfully" });
}
