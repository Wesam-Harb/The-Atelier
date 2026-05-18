"use client";
import { useState, useTransition } from "react";
import { deleteTask } from "@/lib/actions/project-actions";
import AddTaskForm from "./AddTaskForm";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { type Dayjs } from "dayjs";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function EditTaskButton({ id }: { id: string }) {
  const [isEditOpen, setEditIsOpen] = useState(false);
  const [isDeleteOpen, setDeleteIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [dueDate] = useState<Dayjs | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClose = () => {
    handleMenuClose();
    setEditIsOpen(true);
  };

  const handleDeleteClose = () => {
    handleMenuClose();
    setDeleteIsOpen(true);
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteTask(id);

      if (result.success) {
        setDeleteIsOpen(false);
      }
    });
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="text-slate-400 hover:text-[#2f3b88] transition-colors "
      >
        <MoreVertOutlinedIcon />
      </button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem
          onClick={handleEditClose}
          sx={{ color: "#2f3b88", fontWeight: "bold" }}
        >
          <EditIcon className="mr-2 " />
          Edit
        </MenuItem>
        <MenuItem
          onClick={handleDeleteClose}
          sx={{ color: "#A02029", fontWeight: "bold" }}
        >
          <DeleteOutlineOutlinedIcon className="mr-2" />
          Delete
        </MenuItem>
      </Menu>

      {isEditOpen && (
        <AddTaskForm
          id={id}
          setIsOpen={setEditIsOpen}
          initialDueDate={dueDate}
        />
      )}

      {isDeleteOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 backdrop-blur-sm"
          onClick={() => setDeleteIsOpen(false)}
        >
          <div
            className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl relative z-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Delete Task</h2>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>

            <form action={handleDelete}>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDeleteIsOpen(false)}
                  className="flex-1 py-2 text-slate-500 hover:bg-slate-200 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 py-2 hover:bg-indigo-700 hover:scale-105 transition-all duration-300 bg-indigo-600 text-white rounded-xl font-bold cursor-pointer"
                >
                  <span className="flex w-full flex-1 items-center justify-center gap-2">
                    {isPending && (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    )}
                    {isPending ? "Deleting..." : "Delete Task"}
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
