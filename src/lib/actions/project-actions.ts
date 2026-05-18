"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const user = await prisma.user.findFirst();

  if (!user) {
    return { success: false, error: "No user found" };
  }

  try {
    await prisma.project.create({
      data: {
        title: title,
        description: description,
        userId: user.id,
      },
    });

    // This tells Next.js to refresh the data on the page
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Create project error:", error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function deleteProject(projectId: string) {
  try {
    // Delete all tasks associated with the project first
    await prisma.task.deleteMany({
      where: { projectId: projectId },
    });

    // Then delete the project
    await prisma.project.delete({
      where: { id: projectId },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Delete project error:", error);
    return { success: false, error: "Failed to delete project" };
  }
}

export async function updateProject(projectId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  try {
    await prisma.project.update({
      where: { id: projectId },
      data: {
        title: title,
        description: description,
      },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Update project error:", error);
    return { success: false, error: "Failed to update project" };
  }
}

export async function createTask(projectId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const status = formData.get("status") as string;
  const priority = formData.get("priority") as string;
  const dueDateRaw = formData.get("dueDate");

  let dueDate: Date | null = null;
  if (typeof dueDateRaw === "string" && dueDateRaw.trim() !== "") {
    const parsedDate = new Date(dueDateRaw);
    if (!Number.isNaN(parsedDate.getTime())) {
      dueDate = parsedDate;
    }
  }

  if (dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dueDate < today) {
      return { success: false, error: "Due date cannot be before today" };
    }
  }

  try {
    await prisma.task.create({
      data: {
        title: title,
        status: status,
        priority: priority,
        dueDate: dueDate,
        projectId: projectId,
      },
    });
    revalidatePath("/projectDetail/[id]");
    return { success: true };
  } catch (error) {
    console.error("Create Task error:", error);
    return { success: false, error: "Failed to create task" };
  }
}

export async function deleteTask(taskId: string) {
  try {
    await prisma.task.delete({
      where: { id: taskId },
    });
    revalidatePath("/projectDetail/[id]");

    return { success: true };
  } catch (error) {
    console.error("Delete Task error:", error);
    return { success: false, error: "Failed to delete task" };
  }
}

export async function updateTask(taskId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const status = formData.get("status") as string;
  const priority = formData.get("priority") as string;
  const dueDateRaw = formData.get("dueDate");

  let dueDate: Date | null = null;
  if (typeof dueDateRaw === "string" && dueDateRaw.trim() !== "") {
    const parsedDate = new Date(dueDateRaw);
    if (!Number.isNaN(parsedDate.getTime())) {
      dueDate = parsedDate;
    }
  }

  if (dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dueDate < today) {
      return { success: false, error: "Due date cannot be before today" };
    }
  }
  try {
    await prisma.task.update({
      where: { id: taskId },
      data: {
        title: title,
        status: status,
        priority: priority,
        dueDate: dueDate,
      },
    });
    revalidatePath("/projectDetail/[id]");
    return { success: true };
  } catch (error) {
    console.error("Update Task error:", error);

    return { success: false, error: "Failed to update task" };
  }
}

export async function updateTaskStatus(taskId: string, newStatus: string) {
  try {
    await prisma.task.update({
      where: { id: taskId },
      data: { status: newStatus },
    });
    revalidatePath("/projectDetail/[id]");
    return { success: true };
  } catch (error) {
    console.error("Update Task Status error:", error);
    return { success: false, error: "Failed to update task status" };
  }
}

export async function updateProjectStatus(
  projectId: string,
  newStatus: string,
) {
  try {
    await prisma.project.update({
      where: { id: projectId },
      data: { status: newStatus },
    });
    return { success: true };
  } catch (error) {
    console.error("Update Project Status error:", error);
    return { success: false, error: "Failed to update project status" };
  }
}

export async function toggleTaskAndSyncProjectStatus(
  taskId: string,
  projectId: string,
  newStatus: string,
) {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.task.update({
        where: { id: taskId },
        data: { status: newStatus },
      });

      const totalTasks = await tx.task.count({
        where: { projectId },
      });

      const doneTasks = await tx.task.count({
        where: { projectId, status: "Done" },
      });

      const nextProjectStatus =
        totalTasks > 0 && doneTasks === totalTasks ? "Done" : "in-progress";

      await tx.project.update({
        where: { id: projectId },
        data: { status: nextProjectStatus },
      });
    });

    revalidatePath(`/projectDetail/${projectId}`);
    revalidatePath("/");
    revalidatePath("/allTasks");

    return { success: true };
  } catch (error) {
    console.error("Toggle Task And Sync Project Status error:", error);
    return {
      success: false,
      error: "Failed to update task and project status",
    };
  }
}
