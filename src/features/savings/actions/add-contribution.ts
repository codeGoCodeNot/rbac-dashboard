"use server";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/utils/to-action-state";
import prisma from "@/lib/prisma";
import { savingsPage } from "@/path";
import { toCent } from "@/utils/currency";
import { revalidatePath } from "next/cache";
import z from "zod";

const addContributionSchema = z.object({
  amount: z.coerce.number().positive("Amount is required"),
  note: z.string().optional(),
});

const addContribution = async (
  savingsGoalId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  try {
    const { amount, note } = addContributionSchema.parse(
      Object.fromEntries(formData.entries()),
    );

    await prisma.$transaction([
      prisma.contribution.create({
        data: { amount: toCent(amount), note, savingsGoalId },
      }),
      prisma.savingsGoal.update({
        where: { id: savingsGoalId },
        data: { currentAmount: { increment: toCent(amount) } },
      }),
    ]);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(savingsPage());
  return toActionState("SUCCESS", "Contribution added successfully");
};

export default addContribution;
