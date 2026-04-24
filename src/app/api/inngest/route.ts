import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { eventSendVerificationEmail } from "@/features/inngest/functions/event-send-verification-email";
import { eventSendEmailChange } from "@/features/inngest/functions/event-send-email-change";
import { eventSendOrganizationInvitations } from "@/features/inngest/functions/event-send-organization-invitation";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    eventSendVerificationEmail,
    eventSendEmailChange,
    eventSendOrganizationInvitations,
  ],
});
