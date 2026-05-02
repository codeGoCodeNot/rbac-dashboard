// auth
export const forgotPasswordPage = () => "/forgot-password";
export const homePage = () => "/";
export const signInPage = () => "/sign-in";
export const signUpPage = () => "/sign-up";

// dashboard
export const savingsPage = () => "/savings";
export const contributionsPage = () => "/contributions";
export const profilePage = () => "/profile";
export const settingsPage = () => "/settings";

// profile
export const editProfilePage = () => "/profile";

// verification
export const verifyEmailPage = () => "/verify-email";

// email
export const emailChangePage = () => "/email-change";

// organization
export const organizationPage = () => "/organization";
export const createOrganizationPage = () => "/organization/create";
export const organizationDetailsPage = (orgId: string) =>
  `/organization/${orgId}`;
export const organizationInvitationsPage = (orgId: string) =>
  `/organization/${orgId}/invitations`;
export const acceptInvitePage = (inviteId: string) =>
  `/accept-invite/${inviteId}`;
export const onboardingPage = () => "/onboarding";
export const membershipsPage = (orgId: string) =>
  `/organization/${orgId}/memberships`;
