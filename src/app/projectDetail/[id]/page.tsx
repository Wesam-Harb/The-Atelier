import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import CreateTaskButton from "@/components/createTaskButton";
import EditProjectButton from "@/components/editProjectButton";
import DeleteProjectButton from "@/components/deleteProjectButton";
import ToggleCheckBox from "@/components/ToggleCheckBox";
import FloatedCreateTaskButton from "@/components/FloatedCreateTaskButton";
import EditTaskButton from "@/components/editTaskButton";
import Header from "@/components/header";

export default async function ProjectDetails({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status?: string | string[] }>;
}) {
  const formatDueText = (dueDate: Date | null) => {
    if (!dueDate) return "No due date";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    const msPerDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.floor((due.getTime() - today.getTime()) / msPerDay);

    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    if (diffDays > 1) return `Due in ${diffDays} days`;

    const overdueDays = Math.abs(diffDays);
    if (overdueDays === 1) return "Overdue by 1 day";
    return `Overdue by ${overdueDays} days`;
  };

  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const selectedStatusRaw = Array.isArray(resolvedSearchParams.status)
    ? resolvedSearchParams.status[0]
    : resolvedSearchParams.status;

  const normalizeStatus = (value: string) => value.toLowerCase().trim();
  const selectedStatus = selectedStatusRaw
    ? normalizeStatus(selectedStatusRaw)
    : "all";

  const statusFilters = ["all", "todo", "in-progress", "done"] as const;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { tasks: true },
  });

  if (!project) {
    notFound(); // Triggers your not-found.tsx page
  }

  const filteredTasks =
    selectedStatus === "all"
      ? project.tasks
      : project.tasks.filter(
          (task) => normalizeStatus(task.status) === selectedStatus,
        );

  const progressPercentage =
    project.tasks.length === 0
      ? 0
      : (project.tasks.filter((task) => task.status === "Done").length /
          project.tasks.length) *
        100;

  return (
    <div className="flex-1 relative">
      <Header />
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <section className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] uppercase tracking-widest text-[#2f3b88] font-bold bg-primary-fixed px-2 py-0.5 rounded">
                Active Project
              </span>
              <span className="text-xs text-slate-400 font-label">
                Created{" "}
                {project.createdAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold text-[#131b2e] font-headline tracking-tight mb-2">
              {project.title}
            </h1>
            <p className="text-slate-500 max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <EditProjectButton id={id} />
            <DeleteProjectButton id={id} />
            <CreateTaskButton id={id} />
          </div>
        </section>
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 xl:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#f2f3ff] p-4 rounded-xl">
              <div className="flex gap-1 p-1 bg-[#dae2fd] rounded-lg">
                {statusFilters.map((status: any) => {
                  const isActive = selectedStatus === status;
                  const label =
                    status === "all"
                      ? "All"
                      : status === "in-progress"
                        ? "In-progress"
                        : status.charAt(0).toUpperCase() + status.slice(1);

                  return (
                    <Link
                      key={status}
                      href={
                        status === "all"
                          ? `/projectDetail/${id}`
                          : `/projectDetail/${id}?status=${status}`
                      }
                      className={`px-4 py-1.5 rounded-md text-xs transition-colors ${
                        isActive
                          ? "font-bold bg-white text-[#2f3b88] shadow-sm"
                          : "font-semibold text-slate-600 hover:bg-white/50"
                      }`}
                      aria-pressed={isActive}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
              <div className="text-xs font-label text-slate-500">
                Showing{" "}
                <span className="text-[#131b2e] font-bold">
                  {filteredTasks.length}
                </span>{" "}
                tasks in this project
              </div>
            </div>
            <div className="bg-[#f2f3ff]est rounded-xl overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-outline-variant/10 text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-[#f2f3ff]/30">
                <div className="col-span-6">Task Description</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-2 text-center">Priority</div>
                <div className="col-span-2 text-right">Action</div>
              </div>
              <div className="divide-y divide-transparent">
                {filteredTasks.map((task: any) => (
                  <div
                    key={task.id}
                    className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-[#f2f3ff] transition-colors group"
                  >
                    <div className="col-span-6 flex items-center gap-4">
                      <ToggleCheckBox
                        key={`${task.id}-${task.status}`}
                        task={{
                          id: task.id,
                          status: task.status,
                        }}
                        project={{ id: id }}
                      />
                      <div
                        className={`${task.status === "Done" ? "line-through text-slate-400 transition-all duration-500" : ""}`}
                      >
                        <h4
                          className={`font-semibold text-xl text-[#131b2e] ${task.status === "Done" ? "line-through text-slate-400 transition-all duration-500" : ""}`}
                        >
                          {task.title}
                        </h4>
                        <p className="text-xs text-slate-400">
                          {formatDueText(task.dueDate)}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      {task.status === "Todo" && (
                        <span className="bg-rose-500/10 text-rose-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                          {task.status}
                        </span>
                      )}
                      {task.status === "In-progress" && (
                        <span className="bg-amber-500/10 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                          {task.status}
                        </span>
                      )}
                      {task.status === "Done" && (
                        <span className="bg-green-500/10 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                          {task.status}
                        </span>
                      )}
                    </div>
                    <div className="col-span-2 flex justify-center items-center gap-2">
                      {task.priority === "High" && (
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      )}
                      {task.priority === "Medium" && (
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      )}
                      {task.priority === "Low" && (
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      )}
                      <span className="text-xs font-medium text-[#505f76]">
                        {task.priority}
                      </span>
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <EditTaskButton id={task.id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-12 xl:col-span-4 space-y-6">
            <div className="bg-indigo-900 text-[#cacfff] p-6 rounded-xl relative overflow-hidden shadow-xl">
              <div className="relative z-10">
                <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-6 font-label">
                  Overall Progress
                </h3>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-5xl font-black font-headline">
                    {progressPercentage.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-4">
                  <div
                    className="h-full bg-[#ffffff] rounded-full shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                    style={{
                      width: `${Math.min(100, Math.max(0, progressPercentage))}%`,
                    }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8"></div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-[#4854a2]/20 rounded-full blur-3xl"></div>
              <div className="absolute -left-10 top-0 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </main>

      <FloatedCreateTaskButton id={id} />
    </div>
  );
}
