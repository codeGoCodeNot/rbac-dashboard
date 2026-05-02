import { format } from "date-fns";
import { statusStyles } from "../constants";
import { InvitationWithInviter } from "./invitation-list";

type InvitationItemProps = {
  invitation: InvitationWithInviter;
};

const InvitationItem = ({ invitation }: InvitationItemProps) => {
  return (
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
  );
};

export default InvitationItem;
