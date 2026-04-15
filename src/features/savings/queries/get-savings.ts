import prisma from "@/lib/prisma";

const getSavings = async (userId: string) => {
  return await prisma.savingsGoal.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export default getSavings;
