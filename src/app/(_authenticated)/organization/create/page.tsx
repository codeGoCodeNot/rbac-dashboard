import Heading from "@/components/heading";
import { Spinner } from "@/components/ui/spinner";
import OrganizationCreateForm from "@/features/organizations-feature/organization/components/organization-create-form";
import { Suspense } from "react";

const CreateOrganizationPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="Create Organization"
        description="Create a new organization to manage your savings and collaborate with others."
      />
      <Suspense fallback={<Spinner />}>
        <div className="flex flex-1 items-center justify-center">
          <OrganizationCreateForm />
        </div>
      </Suspense>
    </div>
  );
};

export default CreateOrganizationPage;
