// src/middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // 🚀 FIX: This explicit matcher only intercepts the dashboard routes and its subroutes
  // This completely stops it from messing with /login, /register, or the homepage (/)
  matcher: ["/dashboard/:path*"],
};
