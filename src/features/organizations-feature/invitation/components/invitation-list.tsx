import Placeholder from "@/components/placeholder";
import { Invitation, User } from "../../../../../generated/prisma/client";
import InvitationItem from "./invitation-item";

export type InvitationWithInviter = Invitation & {
  inviter: Pick<User, "name" | "email"> | null;
};

type InvitationListProps = {
  invitations: InvitationWithInviter[];
};

const InvitationList = ({ invitations }: InvitationListProps) => {
  if (!invitations.length) return <Placeholder label="No invitations yet" />;

  return (
    <div className="flex flex-col gap-y-2 max-w-3xl mx-auto w-full">
      {invitations.map((invitation) => (
        <InvitationItem key={invitation.id} invitation={invitation} />
      ))}
    </div>
  );
};

export default InvitationList;
