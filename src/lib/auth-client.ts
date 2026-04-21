import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";
import { organizationClient, adminClient } from "better-auth/client/plugins";

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  sendVerificationEmail,
  organization,
} = createAuthClient({
  plugins: [nextCookies(), organizationClient(), adminClient()],
});
