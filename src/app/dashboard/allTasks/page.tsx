import BoltIcon from "@mui/icons-material/Bolt";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TimelineIcon from "@mui/icons-material/Timeline";
import prisma from "@/lib/db";
import ToggleCheckBox from "@/components/ToggleCheckBox";
import EditTaskButton from "@/components/editTaskButton";
import HoveredAddTaskButton from "@/components/hoveredAddTaskButton";
import Header from "@/components/header";
import { auth } from "@/auth";

export default async function allTasks() {
  const session = await auth();

  if (!session?.user?.email) {
    return <div>Not authenticated</div>;
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  const projectsWithTasks = await prisma.project.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      tasks: {},
    },
  });

  const productivity = Math.round(
    (projectsWithTasks.reduce((acc: number, project: any) => {
      const totalTasks = project.tasks.length;
      const completedTasks = project.tasks.filter(
        (t: any) => t.status === "Done",
      ).length;
      return acc + (totalTasks > 0 ? completedTasks / totalTasks : 0);
    }, 0) /
      projectsWithTasks.length) *
      100,
  );

  const TasksDone = projectsWithTasks.reduce((acc: number, project: any) => {
    const completedTasks = project.tasks.filter(
      (t: any) => t.status === "Done",
    ).length;
    return acc + completedTasks;
  }, 0);

  const highPriorityTasks = projectsWithTasks.reduce(
    (acc: number, project: any) => {
      const highPriority = project.tasks.filter(
        (t: any) => t.priority === "High",
      ).length;
      return acc + highPriority;
    },
    0,
  );
  return (
    <div className="flex-1 relative">
      <Header user={user} />

      <main className=" min-h-screen flex flex-col flex-1">
        <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#131b2e] mb-2">
                Global Tasks
              </h1>
              <p className="text-[#505f76] text-sm max-w-md">
                Orchestrate your workflow across all active studios and
                architectural projects from a single panoramic view.
              </p>
            </div>
          </section>
          <div className="grid grid-cols-1 gap-10">
            {/* project and its tasks */}
            {projectsWithTasks.map((project: any) => (
              <section key={project.id} className="space-y-4 group">
                <div className="flex items-center justify-between border-b border-[#c5c5d4]/15 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-[#2f3b88] rounded-full"></div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#505f76] font-label tracking-widest uppercase mt-0.5">
                        {project.description ?? "No description provided yet."}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <HoveredAddTaskButton id={project.id} />
                    <span className="bg-[#dfe0ff] text-[#343f8d] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {
                        project.tasks.filter((t: any) => t.status !== "Done")
                          .length
                      }{" "}
                      Tasks Remaining
                    </span>
                  </div>
                </div>
                <div className="bg-[#ffffff] rounded-xl overflow-hidden shadow-sm border border-[#c5c5d4]/10">
                  {project.tasks.map((task: any) => (
                    <div
                      key={task.id}
                      className="group flex items-center justify-between p-4 border-b border-[#eaedff] hover:bg-[#f2f3ff] transition-colors"
                    >
                      <div className={`flex items-center gap-4 `}>
                        <ToggleCheckBox
                          key={`${task.id}-${task.status}`}
                          task={{ id: task.id, status: task.status }}
                          project={{ id: project.id }}
                        />
                        <div
                          className={`flex flex-col gap-1" ${task.status === "Done" ? "opacity-50 transition-opacity duration-500 line-through" : ""}`}
                        >
                          <span className="font-semibold text-[#131b2e]">
                            {task.title}
                          </span>
                          <span className="text-xs text-[#505f76]">
                            Due: {task.dueDate?.toDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
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
                        <div className="flex items-center gap-2 w-24 max-md:w-fit">
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
                        <div className="flex items-center gap-2  transition-opacity">
                          <EditTaskButton id={task.id} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {/* End of Section */}

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#f2f3ff] p-6 rounded-2xl flex flex-col justify-between h-40">
                <span className=" text-[#2f3b88] " data-icon="auto_awesome">
                  <AutoAwesomeIcon />
                </span>
                <div>
                  <h4 className="text-3xl font-extrabold text-[#131b2e]">
                    {productivity === undefined || isNaN(productivity)
                      ? 0
                      : productivity}
                    %
                  </h4>
                  <p className="text-xs text-[#505f76] font-medium tracking-wide">
                    Total Productivity
                  </p>
                </div>
              </div>
              <div className="bg-[#2f3b88] p-6 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
                <span className="text-white/80 " data-icon="bolt">
                  <BoltIcon />
                </span>
                <div className="z-10">
                  <h4 className="text-3xl font-extrabold text-white">
                    {TasksDone}
                  </h4>
                  <p className="text-xs text-white/70 font-medium tracking-wide">
                    Tasks Completed
                  </p>
                </div>
              </div>
              <div className="bg-[#e2e7ff] p-6 rounded-2xl flex flex-col justify-between h-40">
                <span className="text-[#505f76]" data-icon="timeline">
                  <TimelineIcon />
                </span>
                <div>
                  <h4 className="text-3xl font-extrabold text-[#131b2e]">
                    {highPriorityTasks}
                  </h4>
                  <p className="text-xs text-[#505f76] font-medium tracking-wide">
                    High Priority Tasks
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
