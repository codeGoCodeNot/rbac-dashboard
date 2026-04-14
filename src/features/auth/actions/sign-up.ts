"use server";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/utils/to-action-state";
import z from "zod";
import { passwordSchema } from "../utils/password-schema";
import { redirect } from "next/navigation";
import { homePage } from "@/path";
import { setCookieByKey } from "@/actions/cookies";
import { auth } from "@/lib/auth";

const signUpSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email().min(1, { message: "Email is required" }),
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const signUp = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { name, email, password, confirmPassword } = signUpSchema.parse(
      Object.fromEntries(formData.entries()),
    );

    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  await setCookieByKey("toast", "Sign up successful!");
  redirect(homePage());
};

export default signUp;
