import Heading from "@/components/heading";
import { Spinner } from "@/components/ui/spinner";
import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import getActiveOrganization from "@/features/organizations-feature/organization/queries/get-active-organization";
import ProfileForm from "@/features/profile/components/profile-form";
import { onboardingPage } from "@/path";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const ProfilePage = async () => {
  const user = await getAuthOrRedirect();
  const activeOrganization = await getActiveOrganization();

  if (!activeOrganization) redirect(onboardingPage());

  return (
    <div className="flex flex-col gap-y-8 flex-1">
      <Heading
        title="Update your profile"
        description="Keep your profile updated"
      />
      <div className="flex flex-1 items-center justify-center">
        <Suspense fallback={<Spinner />}>
          <ProfileForm user={user} />
        </Suspense>
      </div>
    </div>
  );
};

export default ProfilePage;
