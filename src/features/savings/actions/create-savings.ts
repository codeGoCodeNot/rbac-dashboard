"use server";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/utils/to-action-state";
import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import prisma from "@/lib/prisma";
import { savingsPage } from "@/path";
import { toCent } from "@/utils/currency";
import { revalidatePath } from "next/cache";
import z from "zod";
import { GoalName } from "../../../../generated/prisma/enums";

const createSavingsSchema = z.object({
  goalName: z.enum(Object.values(GoalName)),
  targetAmount: z.coerce.number().positive("Target Amount is required."),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "is required"),
});

const createSavings = async (_actionState: ActionState, formData: FormData) => {
  const user = await getAuthOrRedirect();

  try {
    const data = createSavingsSchema.parse(
      Object.fromEntries(formData.entries()),
    );

    await prisma.savingsGoal.create({
      data: {
        ...data,
        targetAmount: toCent(data.targetAmount),
        userId: user.id,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(savingsPage());
  return toActionState("SUCCESS", "Savings goal created successfully");
};

export default createSavings;
