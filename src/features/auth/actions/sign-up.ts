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

const signUpSchema = z
  .object({
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
    const { email, password, confirmPassword } = signUpSchema.parse(
      Object.fromEntries(formData.entries()),
    );
    console.log(
      "Email:",
      email,
      "Password:",
      password,
      "Confirm Password:",
      confirmPassword,
    );
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect(homePage());
};

export default signUp;
