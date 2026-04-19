import getAuth from "@/lib/get-auth";
import { signInPage, verifyEmailPage } from "@/path";
import { redirect } from "next/navigation";

const getAuthOrRedirect = async () => {
  const user = await getAuth();

  if (!user) redirect(signInPage());
  if (!user.emailVerified) redirect(verifyEmailPage());

  return user;
};

export default getAuthOrRedirect;
