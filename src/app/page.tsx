import DashboardCard from "@/components/dashboard-card";
import Heading from "@/components/heading";
import { Spinner } from "@/components/ui/spinner";
import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import getActiveOrganization from "@/features/organizations-feature/organization/queries/get-active-organization";
import {
  contributionsPage,
  onboardingPage,
  organizationPage,
  profilePage,
  savingsPage,
  settingsPage,
} from "@/path";
import {
  LucidePenLine,
  LucideSave,
  LucideSettings,
  LucideUser,
  LucideUsers,
} from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const HomePage = async () => {
  const user = await getAuthOrRedirect();
  const activeOrganization = await getActiveOrganization();

  if (!activeOrganization) redirect(onboardingPage());

  return (
    <div className="flex flex-col gap-y-8 flex-1">
      <Heading
        title={`Welcome back, ${user.name.at(0)?.toUpperCase() ?? ""}${user.name.split(" ")[0].slice(1)}!`}
        description="What would you like to do today? View your dashboard, manage your savings, or explore new features?"
      />
      <Suspense fallback={<Spinner />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <DashboardCard
            title="Savings"
            description="Track your sinking funds and savings goals"
            link={savingsPage()}
            icon={
              <div className="w-10 h-10 rounded-md bg-teal-50 flex items-center justify-center mb-2">
                <LucideSave className="w-5 h-5 text-teal-700" />
              </div>
            }
          />
          <DashboardCard
            title="Profile"
            description="Manage your account and personal information"
            link={profilePage()}
            icon={
              <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center mb-2">
                <LucideUser className="w-5 h-5 text-blue-700" />
              </div>
            }
          />
          <DashboardCard
            title="Contributions"
            description="Add or view contributions to your savings goals"
            link={contributionsPage()}
            icon={
              <div className="w-10 h-10 rounded-md bg-orange-50 flex items-center justify-center mb-2">
                <LucidePenLine className="w-5 h-5 text-orange-700" />
              </div>
            }
          />
          <DashboardCard
            title="Settings"
            description="Manage your account settings and preferences"
            link={settingsPage()}
            icon={
              <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center mb-2">
                <LucideSettings className="w-5 h-5 text-gray-600" />
              </div>
            }
          />

          <DashboardCard
            title="Organizations"
            description="Manage your savings groups and members"
            link={organizationPage()}
            icon={
              <div className="w-10 h-10 rounded-md bg-purple-50 flex items-center justify-center mb-2">
                <LucideUsers className="w-5 h-5 text-purple-700" />
              </div>
            }
          />
        </div>
      </Suspense>
    </div>
  );
};

export default HomePage;
