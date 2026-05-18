"use client";
import { useState } from "react";
import AddTaskForm from "./AddTaskForm";

import { type Dayjs } from "dayjs";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export default function CreateTaskButton({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dueDate] = useState<Dayjs | null>(null);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#3C4896] text-white font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all text-sm"
      >
        <AddCircleOutlineOutlinedIcon />
        Add Task
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
