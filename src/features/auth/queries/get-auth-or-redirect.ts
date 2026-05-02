import getOrganizationByUser from "@/features/organizations-feature/organization/queries/get-organization-by-user";
import getAuth from "@/lib/get-auth";
import { onboardingPage, signInPage, verifyEmailPage } from "@/path";
import { redirect } from "next/navigation";

const getAuthOrRedirect = async () => {
  const user = await getAuth();
  if (!user) redirect(signInPage());
  if (!user.emailVerified) redirect(verifyEmailPage());

  const organization = await getOrganizationByUser();
  if (!organization.length) redirect(onboardingPage());

  return user;
};

export default getAuthOrRedirect;
