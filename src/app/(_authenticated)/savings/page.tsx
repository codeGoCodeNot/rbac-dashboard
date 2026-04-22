import { Suspense } from "react";

import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import Heading from "@/components/heading";
import { Spinner } from "@/components/ui/spinner";
import SavingsList from "@/features/savings/components/savings-list";
import CreateSavingsForm from "@/features/savings/components/create-savings-form";
import getActiveOrganization from "@/features/organization/queries/get-active-organization";
import { redirect } from "next/navigation";
import { organizationPage } from "@/path";

const SavingsPage = async () => {
  const user = await getAuthOrRedirect();
  const activeOrganization = await getActiveOrganization();

  if (!activeOrganization) redirect(organizationPage());

  return (
    <div className="flex flex-col gap-y-8 flex-1">
      <Heading
        title="All your Savings in one place"
        description="Managing goals for"
        highlight={activeOrganization.name}
      />

      <CreateSavingsForm />

      <Suspense fallback={<Spinner />}>
        <div className="flex flex-col gap-y-4">
          <h2 className="text-lg font-semibold">
            {user?.name?.split(" ")[0]}'s Savings Goals
          </h2>
          <SavingsList user={user} />
        </div>
      </Suspense>
    </div>
  );
};
export default SavingsPage;
