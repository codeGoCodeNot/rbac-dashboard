import { Suspense } from "react";

import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import Heading from "@/components/heading";
import { Spinner } from "@/components/ui/spinner";
import SavingsList from "@/features/savings/components/savings-list";
import CreateSavingsForm from "@/features/savings/components/create-savings-form";

const SavingsPage = async () => {
  const user = await getAuthOrRedirect();

  return (
    <div className="flex flex-col gap-y-8 flex-1">
      <Heading
        title="All your Savings in one place"
        description="Manage your savings, track your progress, and achieve your financial goals with ease."
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
