"use server";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export type RegisterState = {
  message: string | null;
  messageType: "error" | "success" | null;
};

export async function registerUser(
  _previousState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  // Early check for existing user
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      message: "An account with that email already exists.",
      messageType: "error",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // We wrap ONLY the database creation and sign-in logic in the try/catch
  try {
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    const prismaError = error as { code?: string };

    if (prismaError.code === "P2002") {
      return {
        message: "An account with that email already exists.",
        messageType: "error",
      };
    }

    return {
      message: "Something went wrong while creating your account.",
      messageType: "error",
    };
  }

  // 🚀 FIXED: Moved outside the try/catch block so Next.js can handle it cleanly!
  redirect("/dashboard");
}

export type LoginState = {
  message: string | null;
  messageType: "error" | "success" | null;
};

export async function loginUser(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        message: "Invalid email or password.",
        messageType: "error",
      };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    console.error("Login error:", error);
    return {
      message: "An unexpected error occurred during login.",
      messageType: "error",
    };
  }
  redirect("/dashboard");
}
