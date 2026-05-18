"use client";
import { toggleTaskAndSyncProjectStatus } from "@/lib/actions/project-actions";
import { useState, useTransition } from "react";

import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

export default function ToggleCheckBox({
  task,
  project,
}: {
  task: {
    id: string;
    status: string;
  };
  project: { id: string };
}) {
  const [isDone, setIsDone] = useState(task.status === "Done");
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const nextIsDone = !isDone;
    const nextStatus = nextIsDone ? "Done" : "In-progress";

    setIsDone(nextIsDone);

    startTransition(async () => {
      const result = await toggleTaskAndSyncProjectStatus(
        task.id,
        project.id,
        nextStatus,
      );

      // Revert optimistic state if the server action fails.
      if (!result.success) {
        setIsDone(!nextIsDone);
      }
    });
  };

  return (
    <Checkbox
      checked={isDone}
      disabled={isPending}
      icon={<CircleOutlinedIcon />}
      checkedIcon={<CheckCircleIcon sx={{ color: "#312C85" }} />}
      onChange={handleToggle}
    />
  );
}
