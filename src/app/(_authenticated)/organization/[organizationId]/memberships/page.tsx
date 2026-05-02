import Heading from "@/components/heading";
import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";

type MembershipPageProps = {
  params: Promise<{ organizationId: string }>;
};

const MembershipsPage = async ({ params }: MembershipPageProps) => {
  await getAuthOrRedirect();
  const { organizationId } = await params;

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="Memberships"
        description="Manage your organization memberships"
      />
    </div>
  );
};

export default MembershipsPage;
