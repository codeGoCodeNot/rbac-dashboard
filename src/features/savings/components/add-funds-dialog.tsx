"use client";

import { useActionState, useEffect, useState } from "react";
import { GoalName } from "../../../../generated/prisma/enums";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/utils/to-action-state";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LucidePlusCircle } from "lucide-react";
import { GOAL_NAME_LABELS } from "../constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import addContribution from "../actions/add-contribution";
import { toast } from "sonner";
import { toCurrency } from "@/utils/currency";

type AddFundsProps = {
  savingsGoalId: string;
  goalName: GoalName;
  currentAmount: number;
  targetAmount: number;
};

const AddFundsDialog = ({
  savingsGoalId,
  goalName,
  currentAmount,
  targetAmount,
}: AddFundsProps) => {
  const [open, setOpen] = useState(false);
  const [actionState, action, isPending] = useActionState<
    ActionState,
    FormData
  >(addContribution.bind(null, savingsGoalId), EMPTY_ACTION_STATE);

  const percent = Math.round((currentAmount / targetAmount) * 100);

  useEffect(() => {
    if (actionState.status === "SUCCESS") {
      toast.success(actionState.message);
      setOpen(false);
    }
  }, [actionState.timestamp]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <LucidePlusCircle />
          Add funds
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Funds</DialogTitle>
          <p className="text-sm text-muted-foreground">
            {GOAL_NAME_LABELS[goalName]} · {toCurrency(currentAmount)} /{" "}
            {toCurrency(targetAmount)}
          </p>
        </DialogHeader>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>
        <form action={action} className="flex flex-col gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="amount">Amount (₱)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              placeholder="Enter amount"
              required
            />
            {actionState.fieldErrors?.amount && (
              <p className="text-xs text-destructive">
                {actionState.fieldErrors.amount[0]}
              </p>
            )}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="note">
              Note{" "}
              <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Input id="note" name="note" placeholder="e.g. Monthly savings" />
          </div>
          {actionState.message && (
            <p
              className={`text-sm ${actionState.status === "ERROR" ? "text-destructive" : "text-green-500"}`}
            >
              {actionState.message}
            </p>
          )}
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              {isPending ? "Adding..." : "Add Funds"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFundsDialog;
