import { betterAuth, email } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/utils/password";
import { nextCookies } from "better-auth/next-js";
import { resend } from "./resend";
import { inngest } from "./inngest";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  emailAndPassword: {
    enabled: true,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailConfirmation: async ({ user, newEmail, url }) => {
        await inngest.send({
          name: "app/email.change",
          data: {
            email: newEmail,
            name: user.name,
            url,
          },
        });
      },
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 300,
    sendVerificationEmail: async ({ user, url }) => {
      await inngest.send({
        name: "app/email.verification",
        data: {
          email: user.email,
          name: user.name,
          url,
        },
      });
    },
  },
  plugins: [nextCookies()],
});
