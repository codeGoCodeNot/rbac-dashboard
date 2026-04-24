import { inngest } from "@/lib/inngest";
import { resend } from "@/lib/resend";

type OrganizationInvitationEvent = {
  data: {
    email: string;
    inviteByUsername: string;
    organizationName: string;
    inviteLink: string;
  };
};

export const eventSendOrganizationInvitations = inngest.createFunction(
  {
    id: "app/organization-invitation",
    triggers: { event: "app/organization.invitation" },
  },
  async ({ event }: { event: OrganizationInvitationEvent }) => {
    const { email, inviteByUsername, organizationName, inviteLink } =
      event.data;

    await resend.emails.send({
      from: "Savings App <invitation@savings.johnsenb.dev>",
      to: email,
      subject: `You've been invited to join ${organizationName} on Savings App`,
      html: `
            <p>Hi there,</p>
            <p>${inviteByUsername} has invited you to join ${organizationName} on Savings App.</p>
            <p>Please click the link below to accept the invitation:</p>
            <a href="${inviteLink}" target="_blank">Accept Invitation</a>
            <p>If you have any questions, feel free to reach out!</p>
            <p>Best regards,<br>The Savings App Team</p>
        `,
    });
  },
);
