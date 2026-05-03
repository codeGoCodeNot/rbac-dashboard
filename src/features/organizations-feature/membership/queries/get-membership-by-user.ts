import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import prisma from "@/lib/prisma";

const getMembershipByUser = async (organizationId: string) => {
  const user = await getAuthOrRedirect();

  return await prisma.member.findFirst({
    where: {
      organizationId,
      userId: user.id,
    },
  });
};

export default getMembershipByUser;
