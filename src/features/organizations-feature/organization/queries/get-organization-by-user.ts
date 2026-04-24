import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import prisma from "@/lib/prisma";
import { organization } from "better-auth/plugins";

const getOrganizationByUser = async () => {
  const user = await getAuthOrRedirect();
  if (!user) return [];

  const organizations = await prisma.organization.findMany({
    where: {
      members: {
        some: { userId: user.id },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      members: {
        where: { userId: user.id },
      },
      _count: {
        select: {
          members: true,
        },
      },
    },
  });
  return organizations.map((organization) => ({
    ...organization,
    membershipByUser: organization.members[0],
  }));
};

export default getOrganizationByUser;
