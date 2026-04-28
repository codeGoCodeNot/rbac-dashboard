import getSession from "@/lib/get-session";
import prisma from "@/lib/prisma";

const getActiveOrganization = async () => {
  const session = await getSession();
  if (!session) return null;

  const activeOrganizationId = session?.session.activeOrganizationId;

  if (!activeOrganizationId) {
    const firstOrganization = await prisma.organization.findFirst({
      where: {
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
    });
    return firstOrganization ?? null;
  }

  return await prisma.organization.findUnique({
    where: { id: activeOrganizationId },
  });
};

export default getActiveOrganization;
