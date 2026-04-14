"use server";

import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
} from "@/components/utils/to-action-state";
import { auth } from "@/lib/auth";
import { homePage } from "@/path";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData.entries()),
    );

    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  await setCookieByKey("toast", "Signed in successfully");
  redirect(homePage());
};

export default signIn;
