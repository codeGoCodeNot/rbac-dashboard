"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActionState } from "@/components/utils/to-action-state";
import { LucideMenu, LucideTrash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useActionFeedback from "./use-action-feedback";

type UseConfirmDialogOptions = {
  action: (payload: FormData) => void | Promise<void>;
  title: string;
  description?: string;
  isPending: boolean;
  actionState: ActionState;
  onSuccess?: (actionState: ActionState) => void;
};

const useConfirmDialog = ({
  action,
  title,
  description,
  isPending,
  actionState,
  onSuccess,
}: UseConfirmDialogOptions) => {
  const [open, setOpen] = useState(false);

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) toast.success(actionState.message);
      onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message) toast.error(actionState.message);
    },
  });

  const dialog = (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <form action={action}>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Deleting..." : "Confirm"}
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  const trigger = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LucideMenu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="gap-x-2 cursor-pointer text-destructive"
            onSelect={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
          >
            <LucideTrash className="w-4 h-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return [trigger, dialog];
};

export default useConfirmDialog;
