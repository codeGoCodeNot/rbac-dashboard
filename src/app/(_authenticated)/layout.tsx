const AuthenticatedLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};

export default AuthenticatedLayout;
