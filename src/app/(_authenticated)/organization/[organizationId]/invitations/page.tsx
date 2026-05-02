import Heading from "@/components/heading";
import { Spinner } from "@/components/ui/spinner";
import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import InvitationCreateButton from "@/features/organizations-feature/invitation/components/invitation-create-button";
import InvitationList from "@/features/organizations-feature/invitation/components/invitation-list";
import getInvitations from "@/features/organizations-feature/invitation/queries/get-invitations";
import { Suspense } from "react";

type InvitationPageProps = {
  params: Promise<{ organizationId: string }>;
};

const InvitationPage = async ({ params }: InvitationPageProps) => {
  await getAuthOrRedirect();
  const { organizationId } = await params;

  const invitations = await getInvitations(organizationId);

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="Invitations"
        description="Manage your organization invitations"
        actions={<InvitationCreateButton organizationId={organizationId} />}
      />

      {
        <Suspense fallback={<Spinner />}>
          <InvitationList invitations={invitations} />
        </Suspense>
      }
    </div>
  );
};

export default InvitationPage;
