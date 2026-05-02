import getSession from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { cache } from "react";

const getActiveOrganization = cache(async () => {
  const session = await getSession();
  if (!session) return null;

  const { user, session: sessionData } = session;
  const activeOrganizationId = sessionData.activeOrganizationId;

  if (activeOrganizationId) {
    const org = await prisma.organization.findFirst({
      where: {
        id: activeOrganizationId,
        members: { some: { userId: user.id } },
      },
    });
    if (org) return org;
  }
  return (
    (await prisma.organization.findFirst({
      where: {
        members: { some: { userId: user.id } },
      },
    })) ?? null
  );
});

export default getActiveOrganization;
