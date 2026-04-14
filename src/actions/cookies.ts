"use server";

import { cookies } from "next/headers";

export const getCookieByKey = async (key: string) => {
  const cookieStore = (await cookies()).get(key);

  return cookieStore?.value ?? null;
};

export const deleteCookieByKey = async (key: string) => {
  (await cookies()).delete(key);
};

export const setCookieByKey = async (key: string, value: string) => {
  (await cookies()).set(key, value);
};
