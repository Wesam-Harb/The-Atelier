"use client";

import { useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { createProject } from "@/lib/actions/project-actions";
import ProjectForm from "./ProjectForm";

export default function CreateProjectButton() {
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
      <div className="flex items-center gap-4" onClick={() => setIsOpen(true)}>
        <button className="hidden sm:flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-indigo-700 active:scale-95 transition-all">
          Create Project
        </button>
      </div>

      {isOpen &&
        createPortal(
          <ProjectForm
            setIsOpen={setIsOpen}
            isPending={isPending}
            handleSubmit={handleSubmit}
          />,
          document.body,
        )}
    </>
  );
}
