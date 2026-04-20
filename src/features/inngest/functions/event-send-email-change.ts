import { inngest } from "@/lib/inngest";
import { resend } from "@/lib/resend";

type EventSendEmailChange = {
  data: {
    email: string;
    name: string;
    url: string;
  };
};

export const eventSendEmailChange = inngest.createFunction(
  {
    id: "send-email-change",
    triggers: { event: "app/email.change" },
  },
  async ({ event }: { event: EventSendEmailChange }) => {
    await resend.emails.send({
      from: "Savings App <verify-email-change@savings.johnsenb.dev>",
      to: event.data.email,
      subject: "Confirm your email change",
      html: `<p>Hi ${event.data.name}, you changed your email to ${event.data.email}. Click <a href="${event.data.url}">here</a> to confirm your email change.</p>`,
    });
  },
);
