"use client";

import { useSession } from "@/lib/auth-client";
import { homePage } from "@/path";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const VerifyEmailRedirect = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user.emailVerified) router.push(homePage());
  }, [session?.user.emailVerified]);

  return null;
};

export default VerifyEmailRedirect;
