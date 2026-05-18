// src/app/register/page.tsx
"use client";

import { useActionState } from "react";
import { registerUser, type RegisterState } from "@/lib/actions/auth-actions";

const initialState: RegisterState = {
  message: null,
  messageType: null,
};

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(
    registerUser,
    initialState,
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EEF2FF]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-slate-900">
          Create Account
        </h2>

        <form action={formAction} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold"
            disabled={isPending}
          >
            {isPending ? "Signing Up..." : "Sign Up"}
          </button>

          {state.message ? (
            <p
              className={
                state.messageType === "error"
                  ? "text-sm font-medium text-red-600"
                  : "text-sm font-medium text-emerald-600"
              }
            >
              {state.message}
            </p>
          ) : null}
        </form>
        <span className="mt-2 block">
          if you already have an account,{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            log in here
          </a>
        </span>
      </div>
    </main>
  );
}
