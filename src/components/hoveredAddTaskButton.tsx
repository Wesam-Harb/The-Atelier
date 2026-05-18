"use client";
import AddTaskForm from "./AddTaskForm";
import { useState } from "react";
import { type Dayjs } from "dayjs";
export default function HoveredAddTaskButton({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dueDate] = useState<Dayjs | null>(null);

  return (
    <>
      <div
        className="flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        <button className="bg-[#4f39f6] text-white px-4 py-0.5 rounded-full text-sm font-semibold">
          Add Task
        </button>
      </div>
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
