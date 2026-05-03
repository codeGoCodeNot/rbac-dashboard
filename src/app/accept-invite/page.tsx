import getActiveOrganization from "@/features/organizations-feature/organization/queries/get-active-organization";
import { auth } from "@/lib/auth";
import getSession from "@/lib/get-session";
import { homePage, signInPage } from "@/path";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type AcceptInvitePageProps = {
  searchParams: Promise<{ token: string }>;
};

const AcceptInvitePage = async ({
  searchParams: params,
}: AcceptInvitePageProps) => {
  const { token } = await params;

  const session = await getSession();

  if (!session)
    redirect(`${signInPage()}?callbackUrl=/accept-invite?token=${token}`);

  try {
    await auth.api.acceptInvitation({
      headers: await headers(),
      body: {
        invitationId: token,
      },
    });

    const org = await getActiveOrganization();
    if (org) {
      await auth.api.setActiveOrganization({
        headers: await headers(),
        body: { organizationId: org.id },
      });
    }
  } catch (error) {
    redirect(`${homePage()}?error=Failed to accept invitation.`);
  }

  redirect(homePage());
};

export default AcceptInvitePage;
