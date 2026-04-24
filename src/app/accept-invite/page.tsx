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
  } catch (error) {
    console.log("invite error", error);
    redirect(
      `${homePage()}?error=Failed to accept invitation. Please try again.`,
    );
  }

  redirect(homePage());
};

export default AcceptInvitePage;
