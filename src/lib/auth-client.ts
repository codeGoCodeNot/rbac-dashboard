import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";

export const { signIn, signOut, signUp, useSession, sendVerificationEmail } =
  createAuthClient({
    plugins: [nextCookies()],
  });
