import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import ProfileForm from "@/features/profile/components/profile-form";

const ProfilePage = async () => {
  const user = await getAuthOrRedirect();

  return (
    <div className="flex flex-col gap-y-8 flex-1 items-center">
      <ProfileForm user={user} />
    </div>
  );
};

export default ProfilePage;
