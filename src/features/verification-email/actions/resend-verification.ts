"use server";

import { toActionState } from "@/components/utils/to-action-state";
import { auth } from "@/lib/auth";
import { resendVerificationEmailRateLimit } from "@/lib/redis/rate-limit";
import { homePage } from "@/path";
import { getIp } from "@/utils/get-ip";

const resendVerification = async (email: string) => {
  const ip = await getIp();

  const { success, reset } = await resendVerificationEmailRateLimit.limit(ip);

  if (!success) {
    const resetIn = Math.round((reset - Date.now()) / 1000 / 60);
    return toActionState(
      "ERROR",
      `Too many attempts. Try again in ${resetIn} minutes,`,
    );
  }

  await auth.api.sendVerificationEmail({
    body: { email, callbackURL: homePage() },
  });

  return toActionState("SUCCESS", "Verification email sent!");
};

export default resendVerification;
