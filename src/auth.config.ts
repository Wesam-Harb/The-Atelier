// src/auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login", // If a user isn't logged in on a protected route, send them here
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // !!auth?.user converts the user object to a clean true/false boolean
      const isLoggedIn = !!auth?.user;

      // Because our middleware matcher only runs on /dashboard,
      // returning 'isLoggedIn' here protects everything seamlessly!
      return isLoggedIn;
    },
  },
  providers: [], // Keep this empty here; we populate it in auth.ts
} satisfies NextAuthConfig;
