import { ActionState } from "@/components/utils/to-action-state";
import { useEffect, useRef } from "react";

type UseActionFeedbackOptions = {
  onSuccess?: (args: { actionState: ActionState }) => void;
  onError?: (args: { actionState: ActionState }) => void;
};

const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedbackOptions,
) => {
  const prevTimestamp = useRef(actionState.timestamp);
  const isUpdate = prevTimestamp.current !== actionState.timestamp;

  useEffect(() => {
    if (!isUpdate) return;

    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    }
    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
    }

    prevTimestamp.current = actionState.timestamp;
  }, [isUpdate, actionState, options]);
};

export default useActionFeedback;
