import { inngest } from "@/lib/inngest";
import { resend } from "@/lib/resend";

type SendVerificationEmailEvent = {
  data: {
    email: string;
    name: string;
    url: string;
  };
};

export const eventSendVerificationEmail = inngest.createFunction(
  {
    id: "send-verification-email",
    triggers: { event: "app/email.verification" },
  },
  async ({ event }: { event: SendVerificationEmailEvent }) => {
    await resend.emails.send({
      from: "Savings App <verify@savings.johnsenb.dev>",
      to: event.data.email,
      subject: "Verify your email",
      html: `<p>Hi ${event.data.name}, click <a href="${event.data.url}">here</a> to verify your email.</p>`,
    });
  },
);
