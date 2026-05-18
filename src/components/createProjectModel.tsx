"use client";

import { useState, useTransition } from "react";
import ProjectForm from "./ProjectForm";
import { createProject } from "@/lib/actions/project-actions";

export default function CreateProjectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    // We wrap the server action in startTransition
    startTransition(async () => {
      await createProject(formData);
      setIsOpen(false); // Only closes once the DB is updated
    });
  };

  return (
    <>
      <button
        className="border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 group hover:border-indigo-300 hover:bg-indigo-50/50 transition-all"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all text-2xl font-light">
          +
        </div>
        <div>
          <p className="font-bold text-slate-600 group-hover:text-indigo-600">
            Start New Project
          </p>
          <p className="text-xs text-slate-400">
            Create workspace for your idea
          </p>
        </div>
      </button>

      {/* The actual Modal (Simplified) */}
      {isOpen && (
        <ProjectForm
          setIsOpen={setIsOpen}
          isPending={isPending}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}
