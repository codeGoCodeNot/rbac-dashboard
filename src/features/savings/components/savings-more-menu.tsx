"use client";

import { EMPTY_ACTION_STATE } from "@/components/utils/to-action-state";
import useConfirmDialog from "@/features/hook/use-confirm-dialog";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import deleteSavingsGoal from "../actions/delete-savings-goal";

type SavingsMoreMenuProps = {
  id: string;
};

const SavingsMoreMenu = ({ id }: SavingsMoreMenuProps) => {
  const [actionState, action, isPending] = useActionState(
    deleteSavingsGoal.bind(null, id),
    EMPTY_ACTION_STATE,
  );

  const toastRef = useRef<string | number | null>(null);
  const pendingMessage = "Deleting savings goal...";

  const router = useRouter();

  const [trigger, dialog] = useConfirmDialog({
    action,
    title: "Are you sure you want to delete this savings goal?",
    description: "This action cannot be undone.",
    isPending,
    actionState,
    onSuccess: () => router.refresh(),
  });

  useEffect(() => {
    if (isPending) {
      toastRef.current = toast.loading(pendingMessage);
    } else if (toastRef.current) {
      toast.dismiss(toastRef.current);
    }

    return () => {
      if (toastRef.current) {
        toast.dismiss(toastRef.current);
      }
    };
  }, [isPending, pendingMessage]);

  return (
    <>
      {trigger}
      {dialog}
    </>
  );
};

export default SavingsMoreMenu;
