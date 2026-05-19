import { auth } from "@/auth";
import CalendarPage from "@/components/calendar";
import Header from "@/components/header";
import { upComingTasks } from "@/lib/actions/calendar-actions";
import prisma from "@/lib/db";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Link from "next/link";
export default async function calendar() {
  const upComing = await upComingTasks();
  const session = await auth();

  if (!session?.user?.email) {
    return <div>Not authenticated</div>;
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });
  return (
    <>
      <div className="flex flex-col flex-1 min-h-screen">
        <Header user={user} />
        <main className="lg:flex max-md:flex-col max-md:flex p-8 gap-8 max-sm:p-4">
          <div className="max-md:order-2 md:flex-2">
            <CalendarPage />
          </div>

          <aside className="flex-1 max-md:order-1 max-md:flex max-md:gap-4 col-span-12 lg:col-span-3 md:space-y-8">
            <div className="bg-[#f2f3ff] max-md:flex-1 p-6 rounded-xl border border-[#c5c5d4]/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#454652]/60 mb-4">
                Task Status Legend
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="text-sm font-medium text-[#131b2e]">
                    Done
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#2f3b88]"></span>
                  <span className="text-sm font-medium text-[#131b2e]">
                    In-Progress
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="text-sm font-medium text-[#131b2e]">
                    To-do
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="text-sm font-medium text-[#131b2e]">
                    High Priority
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-[#ffffff] max-md:flex-1 p-6 rounded-xl shadow-sm border border-[#c5c5d4]/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#454652]/60">
                  Upcoming
                </h3>
              </div>
              <div className="space-y-4">
                {upComing.length > 0 ? (
                  upComing.map(
                    (task: {
                      id: string;
                      title: string;
                      dueDate: Date | null;
                      projectId: string;
                      status: string;
                    }) => (
                      <Link
                        className="block"
                        href={`/dashboard/projectDetail/${task.projectId}`}
                        key={task.id}
                      >
                        <div className="group cursor-pointer">
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-1.5 h-12 ${task.status === "In-progress" ? "bg-[#2f3b88]" : "bg-amber-500"} rounded-full group-hover:scale-y-110 transition-transform`}
                            ></div>
                            <div>
                              <h4 className="text-sm font-bold text-[#131b2e] mb-1">
                                {task.title}
                              </h4>

                              <div
                                className={`flex items-center gap-2 text-[10px] font-bold text-[#3d4a69]`}
                              >
                                <span className="text-xs">
                                  <CalendarTodayIcon fontSize="small" />
                                </span>
                                {task.dueDate?.toDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ),
                  )
                ) : (
                  <p className="text-sm text-[#505f76]">
                    No upcoming tasks! Great job!
                  </p>
                )}
              </div>
            </div>
          </aside>
        </main>
      </div>
    </>
  );
}
