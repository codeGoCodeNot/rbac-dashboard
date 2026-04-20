import Heading from "@/components/heading";
import { Spinner } from "@/components/ui/spinner";
import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import ProfileForm from "@/features/profile/components/profile-form";
import { Suspense } from "react";

const ProfilePage = async () => {
  const user = await getAuthOrRedirect();

  return (
    <div className="flex flex-col gap-y-8 flex-1">
      <Heading
        title="Update your profile"
        description="Keep your profile updated"
      />
      <div className="flex flex-col items-center">
        <Suspense fallback={<Spinner />}>
          <ProfileForm user={user} />
        </Suspense>
      </div>
    </div>
  );
};

export default ProfilePage;
