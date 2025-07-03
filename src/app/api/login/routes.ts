import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "../../../../lib/connectDB";
import { User } from "../../../../models/User";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log(email);

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await connectDB();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    return NextResponse.json({
      message: "Login successful",
      user: { id: existingUser._id, email: existingUser.email },
    });
  }

  // Auto-create user if not exists
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashedPassword,
    provider: "credentials",
  });

  return NextResponse.json({
    message: "Account created and logged in",
    user: { id: newUser._id, email: newUser.email },
  });
}
