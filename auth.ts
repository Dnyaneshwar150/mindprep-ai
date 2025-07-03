import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "./lib/connectDB";
import { User } from "./models/User";
import bcrypt from "bcrypt";
import { logger } from "./lib/logger";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await User.findOne({ email });

        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            logger.info(
              `✅ Existing user logged in with credentials: ${email}`,
            );
            return {
              id: user._id.toString(),
              email: user.email,
            };
          } else {
            logger.warn(`🟠 Invalid password attempt for user: ${email}`);
            return null;
          }
        } else {
          try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
              email,
              password: hashedPassword,
              provider: "credentials",
            });
            logger.info(`✅ New user registered and logged in: ${email}`);
            return {
              id: newUser._id.toString(),
              email: newUser.email,
            };
          } catch (error) {
            logger.error(`❌ Error creating new user (${email}): ${error}`);
            throw new Error("Failed to create account");
          }
        }
      },
    }),
  ],
  session: { maxAge: 3600 },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectDB();
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            await User.create({
              email: user.email,
              name: user.name,
              image: user.image,
              provider: "google",
              providerId: account.providerAccountId,
            });
            logger.info(`✅ New Google user created: ${user.email}`);
          } else {
            logger.info(`🔁 Existing Google user logged in: ${user.email}`);
          }
          return true;
        } catch (err) {
          logger.error(
            `❌ Error during Google sign-in for ${user.email}: ${err}`,
          );
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      return session;
    },
  },
});
