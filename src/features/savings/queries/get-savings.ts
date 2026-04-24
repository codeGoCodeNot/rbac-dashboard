import getActiveOrganization from "@/features/organizations-feature/organization/queries/get-active-organization";
import prisma from "@/lib/prisma";

const getSavings = async (userId: string) => {
  const activeOrganization = await getActiveOrganization();

  if (!activeOrganization) return [];

  return await prisma.savingsGoal.findMany({
    where: {
      userId,
      organizationId: activeOrganization?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export default getSavings;
