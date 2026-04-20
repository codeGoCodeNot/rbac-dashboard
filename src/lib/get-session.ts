import { headers } from "next/headers";
import { auth } from "./auth";
import { cache } from "react";

const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});

export default getSession;
