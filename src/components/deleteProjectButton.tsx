"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteProject } from "@/lib/actions/project-actions";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function DeleteProjectButton({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      setError("");
      const result = await deleteProject(id);

      if (result.success) {
        setIsOpen(false);
        router.push("/");
      } else {
        setError(result.error || "Failed to delete project");
      }
    });
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FFDAD6] text-[#A02029] font-semibold hover:opacity-90 transition-all text-sm"
      >
        <DeleteOutlineOutlinedIcon />
        Delete Project
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
            <h2 className="text-2xl font-bold mb-4">Delete Project</h2>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete this project? This action cannot
              be undone.
            </p>
            {error && (
              <p className="text-red-600 text-sm mb-4 p-2 bg-red-50 rounded">
                {error}
              </p>
            )}
            <form action={handleDelete}>
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
                    {isPending ? "Deleting..." : "Delete Project"}
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
