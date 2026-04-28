import { headers } from "next/headers";
import { auth } from "./auth";
import { cache } from "react";

const getSession = cache(async () => {
  try {
    return await auth.api.getSession({
      headers: await headers(),
    });
  } catch {
    return null;
  }
});

export default getSession;
