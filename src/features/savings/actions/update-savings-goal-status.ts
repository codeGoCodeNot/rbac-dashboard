"use server";

import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import { GoalStatus, MemberRole } from "../../../../generated/prisma/enums";
import prisma from "@/lib/prisma";
import { toActionState } from "@/components/utils/to-action-state";
import { revalidatePath } from "next/cache";
import { savingsPage } from "@/path";

const updateSavingsGoalStatus = async (
  goalId: string,
  goalStatus: GoalStatus,
) => {
  const user = await getAuthOrRedirect();

  const goal = await prisma.savingsGoal.findUnique({
    where: { id: goalId },
  });

  const member = await prisma.member.findFirst({
    where: {
      userId: user.id,
      organizationId: goal?.organizationId,
    },
  });

  if (member?.role !== MemberRole.owner && member?.role !== MemberRole.admin) {
    return toActionState(
      "ERROR",
      "You do not have permission to update this savings goal.",
    );
  }

  await prisma.savingsGoal.update({
    where: { id: goalId },
    data: { goalStatus },
  });

  revalidatePath(savingsPage());
  return toActionState(
    "SUCCESS",
    `Goal ${goalStatus.toLowerCase()} successfully`,
  );
};

export default updateSavingsGoalStatus;
