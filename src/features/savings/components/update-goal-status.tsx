"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { GoalStatus, SavingsGoal } from "../../../../generated/prisma/client";
import updateSavingsGoalStatus from "../actions/update-savings-goal-status";
import { GOAL_STATUS_LABELS } from "../constants";

type GoalStatusProps = {
  saving: SavingsGoal;
};

const GoalStatusUpdate = ({ saving }: GoalStatusProps) => {
  const statusStyles: Record<GoalStatus, string> = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    REJECTED: "bg-red-50 text-red-700 border-red-200",
  };

  const handleUpdateStatus = async (value: string) => {
    const promiseStatus = updateSavingsGoalStatus(
      saving.id,
      value as GoalStatus,
    );
    toast.promise(promiseStatus, {
      loading: "Updating goal status...",
    });
    const result = await promiseStatus;
    if (result.status === "ERROR") {
      toast.error(result.message);
    } else if (result.status === "SUCCESS") {
      toast.success(result.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusStyles[saving.goalStatus]}`}
        >
          {GOAL_STATUS_LABELS[saving.goalStatus]}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={saving.goalStatus}
          onValueChange={handleUpdateStatus}
        >
          {(Object.keys(GOAL_STATUS_LABELS) as GoalStatus[]).map((key) => (
            <DropdownMenuRadioItem key={key} value={key}>
              {GOAL_STATUS_LABELS[key]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GoalStatusUpdate;
