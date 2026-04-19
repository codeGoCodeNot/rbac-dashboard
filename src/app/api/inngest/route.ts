import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { eventSendVerificationEmail } from "@/features/inngest/functions/event-send-verification-email";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [eventSendVerificationEmail],
});
