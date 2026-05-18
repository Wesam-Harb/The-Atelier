"use client";
import { useState, useTransition } from "react";
import { updateProject } from "@/lib/actions/project-actions";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function EditProjectButton({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleEdit = (formData: FormData) => {
    startTransition(async () => {
      await updateProject(id, formData);
      setIsOpen(false);
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#f2f3ff] text-[#2f3b88] font-semibold hover:bg-[#dae2fd] transition-all text-sm"
      >
        <EditOutlinedIcon />
        Edit Project
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl relative z-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Edit Project</h2>

            <form action={handleEdit}>
              <input
                name="title"
                className="w-full border p-3 rounded-xl mb-4"
                placeholder="Project Name"
                required
              />
              <input
                name="description"
                className="w-full border p-3 rounded-xl mb-4"
                placeholder="Project Description"
                required
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2 text-slate-500 hover:bg-slate-200 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 py-2  hover:bg-indigo-700 hover:scale-105 transition-all duration-300 bg-indigo-600 text-white rounded-xl font-bold cursor-pointer"
                >
                  <span className="flex w-full flex-1 items-center justify-center gap-2">
                    {isPending && (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    )}
                    {isPending ? "Saving..." : "Create Project"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
