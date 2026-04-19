"use client";

import { useState } from "react";
import { toast } from "sonner";
import resendVerification from "../actions/resend-verification";

type ResendVerificationButtonProps = {
  email: string;
};

const ResendVerificationButton = ({ email }: ResendVerificationButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  const handleResend = async () => {
    setIsPending(true);
    const result = await resendVerification(email);
    setIsPending(false);
    if (result.status === "ERROR") {
      toast.error(result.message);
    } else {
      toast.success(result.message);
    }
  };

  return (
    <span
      onClick={handleResend}
      className="font-medium underline cursor-pointer disabled:opacity-50"
    >
      {isPending ? "Resending..." : "Resend verification email"}
    </span>
  );
};

export default ResendVerificationButton;
