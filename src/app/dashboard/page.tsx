import Link from "next/link";
import prisma from "@/lib/db";
import CreateProjectModal from "@/components/createProjectModel";
import EditProjectMenu from "@/components/editProjectMenu";
import Header from "@/components/header";
import { auth } from "@/auth";
export default async function HomePage() {
  const session = await auth();

  if (!session?.user?.email) {
    return <div>Not authenticated</div>;
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  const projects = await prisma.project.findMany({
    include: {
      tasks: true,
    },
    where: {
      userId: user?.id,
    },
    orderBy: { createdAt: "desc" },
  });

  const totalInProgress = projects.reduce((acc: number, p: any) => {
    return acc + (p.status === "in-progress" ? 1 : 0);
  }, 0);

  const totalCompleted = projects.length - totalInProgress;

  return (
    <div className="flex-1 relative">
      <Header user={user} />

      {/* main content */}
      <main className="flex-1 p-6 md:p-10 bg-slate-50">
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 max-w-7xl mx-auto">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Welcome back, {user?.name || "Designer"}
            </h2>
            <p className="text-slate-500">
              You have{" "}
              <span className="text-indigo-600 font-bold">
                {projects.length} active projects
              </span>{" "}
              today.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm min-w-35">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">
                  Completed
                </p>
                <p className="text-xl font-black text-slate-900">
                  {totalCompleted}
                </p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm min-w-35">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center font-bold">
                ⋯
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">
                  In Progress
                </p>
                <p className="text-xl font-black text-slate-900">
                  {totalInProgress}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project: any) => {
            const completedCount = project.tasks.filter(
              (t: any) => t.status === "Done",
            ).length;
            const totalCount = project.tasks.length;
            const progress =
              totalCount > 0
                ? Math.round((completedCount / totalCount) * 100)
                : 0;

            return (
              <div
                key={project.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold">
                      P
                    </div>
                    <EditProjectMenu id={project.id} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-8">
                    {project.description ?? "No description provided yet."}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">
                      {completedCount}/{totalCount} tasks done
                    </span>
                    <span className="text-sm font-black text-indigo-600">
                      {progress}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <Link
                    href={`/projectDetail/${project.id}`}
                    className="block w-full text-center bg-[#dae2fd] text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-600 hover:text-white transition-all text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}

          {/* START NEW PROJECT CARD */}
          <CreateProjectModal />
        </div>
      </main>
    </div>
  );
}
