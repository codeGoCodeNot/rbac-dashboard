"use client";

import { getAuthUser } from "@/features/auth/actions/get-auth-user";
import { User } from "better-auth/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AvatarDropdown from "./sidebar/components/avatar-dropdown";
import { SidebarTrigger } from "./ui/sidebar";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getAuthUser();
      setUser(user);
      setIsLoading(false);
    };
    fetchUser();
  }, [pathname]);

  if (isLoading) return null;

  return (
    <header className="border-b border-gray-300 py-2.5 px-5 flex items-center justify-between animate-fade-from-top fixed top-0 z-20 w-full bg-background">
      {user && <AvatarDropdown user={user} />}
      <SidebarTrigger className="ml-auto" />
    </header>
  );
};

export default Header;
