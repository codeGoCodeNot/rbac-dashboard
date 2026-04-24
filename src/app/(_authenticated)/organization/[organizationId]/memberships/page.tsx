import Heading from "@/components/heading";

type MembershipPageProps = {
  params: Promise<{ organizationId: string }>;
};

const MembershipsPage = async ({ params }: MembershipPageProps) => {
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
