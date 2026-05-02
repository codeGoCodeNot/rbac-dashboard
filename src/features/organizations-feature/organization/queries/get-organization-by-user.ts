import getAuth from "@/lib/get-auth";
import prisma from "@/lib/prisma";
import { cache } from "react";

const getOrganizationByUser = cache(async () => {
  const user = await getAuth();
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
});

export default getOrganizationByUser;
