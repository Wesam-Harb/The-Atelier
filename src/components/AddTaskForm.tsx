"use client";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { useState, useTransition } from "react";
import { updateTask, createTask } from "@/lib/actions/project-actions";

export default function AddTaskForm({
  id,
  initialDueDate,
  setIsOpen,
  create = false,
}: {
  id: string;
  initialDueDate: dayjs.Dayjs | null;
  setIsOpen: (isOpen: boolean) => void;
  create?: boolean;
}) {
  const [dateError, setDateError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>(initialDueDate);

  const minAllowedDate = dayjs().startOf("day");

  const isDateBeforeMin = Boolean(
    dueDate && dueDate.isBefore(minAllowedDate, "day"),
  );
  const isSubmitDisabled = isPending || !dueDate || isDateBeforeMin;

  const handleEdit = (formData: FormData) => {
    startTransition(async () => {
      if (!dueDate) {
        setDateError("Due date is required.");
        return;
      }

      if (dueDate.isBefore(minAllowedDate, "day")) {
        setDateError("Due date cannot be before today.");
        return;
      }

      setDateError("");
      formData.set("dueDate", dueDate.toISOString());

      const result = await updateTask(id, formData);

      if (result.success) {
        setIsOpen(false);
      } else if (result.error) {
        setDateError(result.error);
      }
    });
  };

  const handleCreate = (formData: FormData) => {
    startTransition(async () => {
      if (!dueDate) {
        setDateError("Due date is required.");
        return;
      }

      if (dueDate.isBefore(minAllowedDate, "day")) {
        setDateError("Due date cannot be before today.");
        return;
      }

      setDateError("");
      formData.set("dueDate", dueDate.toISOString());

      await createTask(id, formData);
      setIsOpen(false);
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl relative z-110"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">
          {create ? "Create Task" : "Edit Task"}
        </h2>
        <form action={create ? handleCreate : handleEdit}>
          <input
            name="title"
            className="w-full outline-0 focus:ring-2 focus:bg-white focus:ring-[#2f3b8833] p-3 rounded-xl mb-4 bg-[#F2F3FF]"
            placeholder="Task Name"
            required
          />

          <MobileDatePicker
            label="Due Date"
            value={dueDate}
            onChange={(newValue) => {
              setDueDate(newValue);
              if (newValue && newValue.isBefore(minAllowedDate, "day")) {
                setDateError("Due date cannot be before today.");
              } else {
                setDateError("");
              }
            }}
            name="dueDate"
            minDate={dayjs()}
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                error: Boolean(dateError),
                helperText: dateError,
                className: "w-full mb-4",
                sx: {
                  "& .MuiPickersOutlinedInput-root": {
                    borderRadius: "0.75rem",
                    backgroundColor: "#F2F3FF",
                    transition:
                      "box-shadow 150ms ease, background-color 150ms ease",

                    "& .MuiPickersOutlinedInput-notchedOutline": {
                      borderColor: "transparent",
                    },

                    "&:hover .MuiPickersOutlinedInput-notchedOutline": {
                      borderColor: "rgba(47, 59, 136, 0.35)",
                    },

                    "&.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
                      borderColor: "transparent",
                    },

                    "&.Mui-focused": {
                      backgroundColor: "white",
                      boxShadow: "0 0 0 2px rgba(47, 59, 136, 0.2)",
                      border: "none",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInputBase-input": {
                    padding: "0.75rem",
                  },
                  "& .MuiPickersInputBase-root": {
                    borderRadius: "0.75rem",
                  },
                },
              },
            }}
          />

          <div className="flex gap-4 w-full mt-4">
            <div className="flex-1">
              <label className="block mb-2 text-[12px] font-bold tracking-widest uppercase text-slate-400">
                Status
              </label>
              <select
                name="status"
                className="w-full outline-0 focus:ring-2 focus:bg-white focus:ring-[#2f3b8833] p-3 rounded-xl mb-4 bg-[#F2F3FF]"
              >
                <option value="In-progress">in-progress</option>
                <option value="Todo">Todo</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-[12px] font-bold tracking-widest uppercase text-slate-400">
                Priority
              </label>
              <select
                name="priority"
                className="w-full outline-0 focus:ring-2 focus:bg-white focus:ring-[#2f3b8833] p-3 rounded-xl mb-4 bg-[#F2F3FF]"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 py-2 text-slate-500 hover:bg-slate-200 rounded-xl font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="flex-1 py-2 hover:bg-indigo-700 hover:scale-105 transition-all duration-300 bg-indigo-600 text-white rounded-xl font-bold cursor-pointer"
            >
              <span className="flex w-full flex-1 items-center justify-center gap-2">
                {isPending && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {isPending
                  ? "Saving..."
                  : create
                    ? "Create Task"
                    : "Update Task"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
