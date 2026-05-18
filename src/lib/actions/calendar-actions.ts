// src/lib/actions/calendar-actions.ts
"use server";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import dayjs from "dayjs";

export async function getTasksForDateRange(startDate: Date, endDate: Date) {
  const session = await auth();
  if (!session?.user?.email) {
    return [];
  }
  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  return await prisma.task.findMany({
    where: {
      project: {
        userId: user?.id,
      },
      dueDate: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
}

export async function upComingTasks() {
  const session = await auth();
  if (!session?.user?.email) {
    return [];
  }
  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  const startOfToday = dayjs().startOf("day").toDate();

  return await prisma.task.findMany({
    where: {
      status: { not: "done" },
      dueDate: {
        gte: startOfToday,
      },
      project: {
        userId: user?.id,
      },
    },
    orderBy: {
      dueDate: "asc",
    },
    take: 3,
    include: {
      project: true,
    },
  });
}
