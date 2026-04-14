import getSession from "./get-session";

const getAuth = async () => {
  const session = await getSession();

  return session?.user || null;
};

export default getAuth;
