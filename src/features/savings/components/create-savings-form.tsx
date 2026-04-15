"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import createSavings from "../actions/create-savings";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/utils/to-action-state";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GOAL_NAME_LABELS } from "../constants";

const CreateSavingsForm = () => {
  const [actionState, action, isPending] = useActionState<
    ActionState,
    FormData
  >(createSavings, EMPTY_ACTION_STATE);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="goalName">Goal</Label>
          <Select
            name="goalName"
            defaultValue={actionState.payload?.get("goalName") as string}
          >
            <SelectTrigger id="goalName" className="w-full">
              <SelectValue placeholder="Select a goal" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(GOAL_NAME_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {actionState.fieldErrors?.goalName && (
            <p className="text-xs text-destructive">
              {actionState.fieldErrors.goalName[0]}
            </p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="targetAmount">Target Amount (₱)</Label>
          <Input
            id="targetAmount"
            name="targetAmount"
            type="number"
            placeholder="50,000"
            defaultValue={actionState.payload?.get("targetAmount") as string}
            required
          />
          {actionState.fieldErrors?.targetAmount && (
            <p className="text-xs text-destructive">
              {actionState.fieldErrors.targetAmount[0]}
            </p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="deadline">Deadline</Label>
          <Input
            id="deadline"
            name="deadline"
            type="date"
            defaultValue={actionState.payload?.get("deadline") as string}
          />
          {actionState.fieldErrors?.deadline && (
            <p className="text-xs text-destructive">
              {actionState.fieldErrors.deadline[0]}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating..." : "Create Savings Goal"}
      </Button>
    </form>
  );
};

export default CreateSavingsForm;
