"use client";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { getCalendarDays } from "@/lib/calendar-logic";
import { getTasksForDateRange } from "@/lib/actions/calendar-actions";

type CalendarTask = {
  id: string | number;
  title: string;
  dueDate: string | Date | null;
  priority?: string;
  status?: string;
};

export default function CalendarClient() {
  const [viewDate, setViewDate] = useState(dayjs());
  const [tasks, setTasks] = useState<CalendarTask[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks whenever the month/year changes
  useEffect(() => {
    async function loadTasks() {
      setLoading(true);
      const days = getCalendarDays(viewDate.month(), viewDate.year());
      const start = new Date(days[0].date);
      const end = new Date(days[41].date);

      const data = await getTasksForDateRange(start, end);
      setTasks(data);
      setLoading(false);
    }
    loadTasks();
  }, [viewDate]);

  const days = getCalendarDays(viewDate.month(), viewDate.year());

  return (
    <div
      className={loading ? "opacity-50 pointer-events-none flex-2 " : "flex-2"}
    >
      {/* 1. Header with WORKING buttons */}
      <div className="flex justify-between items-center p-4 rounded-t-lg bg-white ">
        <h1 className="text-2xl font-bold">{viewDate.format("MMMM YYYY")}</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setViewDate(viewDate.subtract(1, "month"))}
            className="flex justify-center items-center aspect-square w-10 bg-indigo-600 text-white border rounded-full hover:bg-indigo-700"
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </button>
          <button
            onClick={() => setViewDate(viewDate.add(1, "month"))}
            className="flex justify-center items-center aspect-square w-10 bg-indigo-600 text-white border rounded-full hover:bg-indigo-700"
          >
            <ArrowForwardIosIcon fontSize="small" />
          </button>
        </div>
      </div>

      {/* 2. Grid (Same as before, but using the 'tasks' state) */}
      <div className="grid grid-cols-7 border-t border-l border-slate-100">
        <span className="flex items-center justify-center bg-[#FBFBFF] p-2 text-xs text-[#454652b3]/70 font-bold">
          MON
        </span>
        <span className="flex items-center justify-center bg-[#FBFBFF] p-2 text-xs text-[#454652b3]/70 font-bold">
          TUE
        </span>
        <span className="flex items-center justify-center bg-[#FBFBFF] p-2 text-xs text-[#454652b3]/70 font-bold">
          WED
        </span>
        <span className="flex items-center justify-center bg-[#FBFBFF] p-2 text-xs text-[#454652b3]/70 font-bold">
          THU
        </span>
        <span className="flex items-center justify-center bg-[#FBFBFF] p-2 text-xs text-[#454652b3]/70 font-bold">
          FRI
        </span>
        <span className="flex items-center justify-center bg-[#FBFBFF] p-2 text-xs text-[#454652b3]/70 font-bold">
          SAT
        </span>
        <span className="flex items-center justify-center bg-[#FBFBFF] p-2 text-xs text-[#454652b3]/70 font-bold">
          SUN
        </span>

        {days.map(
          (day: {
            date: string;
            dayNumber: number;
            isCurrentMonth: boolean;
            fullDate: dayjs.Dayjs;
          }) => {
            const dayTasks = tasks.filter((t) =>
              dayjs(t.dueDate).isSame(day.fullDate, "day"),
            );

            return (
              <div
                key={day.date}
                className={`h-36 border-r border-b border-[#f2f3ff] hover:bg-[#f2f3ff]/50 transition-colors p-2 ${!day.isCurrentMonth ? "bg-slate-50" : "bg-white"}`}
              >
                <span className="text-sm font-semibold">{day.dayNumber}</span>
                <div className="mt-2 space-y-1">
                  {dayTasks.map((task: CalendarTask) => (
                    <div
                      key={task.id}
                      className={`text-[10px] p-1 rounded border-l-4 ${task.priority === "High" ? "border-r-4 border-r-red-500" : ""} bg-blue-50 ${task.status === "Done" ? "border-emerald-500" : task.status === "In-progress" ? "border-[#2f3b88]" : "border-amber-500"} `}
                    >
                      {task.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
