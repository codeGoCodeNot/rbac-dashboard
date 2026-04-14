"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { homePage } from "@/path";
import { FaGoogle } from "react-icons/fa";

type GoogleSignInProps = {
  title: string;
};

const GoogleSignIn = ({ title }: GoogleSignInProps) => {
  const handleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: homePage(),
    });
  };

  return (
    <Button
      variant="outline"
      className="w-full flex gap-x-2 items-center"
      type="button"
      onClick={handleSignIn}
    >
      <span>{title}</span>
      <FaGoogle className="text-[#4285f4]" />
    </Button>
  );
};

export default GoogleSignIn;
