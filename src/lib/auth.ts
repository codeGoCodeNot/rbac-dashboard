import { betterAuth, email } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/utils/password";
import { nextCookies } from "better-auth/next-js";
import { resend } from "./resend";
import { inngest } from "./inngest";
import { admin, organization } from "better-auth/plugins";

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
  plugins: [
    nextCookies(),
    organization({
      sendInvitationEmail: async (data) => {
        console.log("sending invitation to", data.email);
        const inviteLink = `${process.env.BETTER_AUTH_URL}/invitations/${data.invitation.id}`;

        await inngest.send({
          name: "app/organization.invitation",
          data: {
            email: data.email,
            inviteByUsername: data.inviter.user.name,
            organizationName: data.organization.name,
            inviteLink,
          },
        });
      },
      requireEmailVerificationOnInvitation: true,
      invitationExpiresIn: 7 * 24 * 60 * 60, // 7 days
    }),
    admin(),
  ],
});
