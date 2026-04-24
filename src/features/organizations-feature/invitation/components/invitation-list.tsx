import { format } from "date-fns/format";
import { Invitation, User } from "../../../../../generated/prisma/client";

type InvitationWithInviter = Invitation & {
  inviter: Pick<User, "name" | "email"> | null;
};

type InvitationListProps = {
  invitations: InvitationWithInviter[];
};

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  accepted: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-700",
};

const InvitationList = ({ invitations }: InvitationListProps) => {
  return (
    <div className="flex flex-col gap-y-2 max-w-3xl mx-auto w-full">
      {invitations.map((invitation) => (
        <div
          key={invitation.id}
          className="flex items-center justify-between px-4 py-3 bg-background border border-border rounded-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-sm font-medium text-purple-700 flex-shrink-0">
              {invitation.email.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium">{invitation.email}</p>
              <p className="text-xs text-muted-foreground">
                Invited by {invitation.inviter?.name} ·{" "}
                {format(invitation.createdAt, "MMM d, yyyy")} ·{" "}
                {invitation.role ?? "member"}
              </p>
            </div>
          </div>
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[invitation.status] ?? "bg-muted text-muted-foreground"}`}
          >
            {invitation.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default InvitationList;
