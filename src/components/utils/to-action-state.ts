import z from "zod";

export type ActionState = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  payload?: FormData;
  timestamp: number;
  fieldErrors: Record<string, string[]>;
};

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData,
): ActionState => {
  if (error instanceof z.ZodError) {
    const flattenError = z.flattenError(error).fieldErrors;
    return {
      // fielderrors
      status: "ERROR",
      message: "",
      payload: formData,
      timestamp: Date.now(),
      fieldErrors: flattenError,
    };
  } else if (error instanceof Error) {
    // db error
    return {
      status: "ERROR",
      message: error.message,
      payload: formData,
      timestamp: Date.now(),
      fieldErrors: {},
    };
  } else {
    return {
      status: "ERROR",
      message: "An unknown error occurred",
      payload: formData,
      timestamp: Date.now(),
      fieldErrors: {},
    };
  }
};

// handle success action state
export const toActionState = (
  status: ActionState["status"],
  message: string,
  formData?: FormData,
) => {
  return {
    timestamp: Date.now(),
    status,
    message,
    fieldErrors: {},
    payload: formData,
  };
};
