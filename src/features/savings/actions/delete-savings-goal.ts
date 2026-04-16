"use server";

import { toActionState } from "@/components/utils/to-action-state";
import prisma from "@/lib/prisma";
import { savingsPage } from "@/path";
import { revalidatePath } from "next/cache";

const deleteSavingsGoal = async (id: string) => {
  await prisma.savingsGoal.delete({
    where: { id },
  });

  return toActionState("SUCCESS", "Savings goal deleted successfully");
};

export default deleteSavingsGoal;
