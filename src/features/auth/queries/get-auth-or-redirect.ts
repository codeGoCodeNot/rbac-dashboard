import getAuth from "@/lib/get-auth";
import { signInPage } from "@/path";
import { redirect } from "next/navigation";

const getAuthOrRedirect = async () => {
  const user = await getAuth();

  if (!user) redirect(signInPage());

  return user;
};

export default getAuthOrRedirect;
