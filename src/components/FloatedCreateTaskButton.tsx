"use client";
import { useState } from "react";
import AddTaskForm from "./AddTaskForm";

import { type Dayjs } from "dayjs";

import AddIcon from "@mui/icons-material/Add";

export default function FloatedCreateTaskButton({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dueDate] = useState<Dayjs | null>(null);

  return (
    <>
      <button
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[#2f3b88] text-[#ffffff] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
        onClick={() => setIsOpen(true)}
      >
        <AddIcon />
        <span className="absolute right-16 bg-[#131b2e] text-white text-[10px] font-bold py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          NEW TASK
        </span>
      </button>
      {isOpen && (
        <AddTaskForm
          id={id}
          setIsOpen={setIsOpen}
          initialDueDate={dueDate}
          create={true}
        />
      )}
    </>
  );
}
