// src/auth.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // src/auth.ts
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) {
          console.log("❌ DEBUG: No user found with this email");
          return null;
        }

        console.log("✅ DEBUG: User found, checking password...");

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (!passwordMatch) {
          console.log("❌ DEBUG: Password does not match hash");
          return null;
        }

        console.log("🚀 DEBUG: Login Successful!");
        return user;
      },
    }),
  ],
});
