import Heading from "@/components/heading";
import { Spinner } from "@/components/ui/spinner";
import InvitationCreateButton from "@/features/organization/components/invitation-create-button";
import InvitationList from "@/features/organization/components/invitation-list";
import getInvitations from "@/features/organization/queries/get-invitations";
import { Suspense } from "react";

type InvitationPageProps = {
  params: Promise<{ organizationId: string }>;
};

const InvitationPage = async ({ params }: InvitationPageProps) => {
  const { organizationId } = await params;

  const invitations = await getInvitations(organizationId);

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="Invitations"
        description="Manage your organization invitations"
        actions={<InvitationCreateButton organizationId={organizationId} />}
      />

      {invitations.length > 0 ? (
        <Suspense fallback={<Spinner />}>
          <InvitationList invitations={invitations} />
        </Suspense>
      ) : (
        <p className="text-sm text-muted-foreground">
          No invitations found. Use the button above to invite members to your
          organization.
        </p>
      )}
    </div>
  );
};

export default InvitationPage;
