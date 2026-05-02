import Heading from "@/components/heading";
import { Spinner } from "@/components/ui/spinner";
import OrganizationCreateForm from "@/features/organizations-feature/organization/components/organization-create-form";
import { Suspense } from "react";

const CreateOrganizationPage = () => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <Heading
        title="Create Organization"
        description="Create a new organization to manage your savings and collaborate with others."
      />
      <Suspense fallback={<Spinner />}>
        <OrganizationCreateForm />
      </Suspense>
    </div>
  );
};

export default CreateOrganizationPage;
