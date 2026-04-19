"use client";

import { getAuthUser } from "@/features/auth/actions/get-auth-user";
import { homePage } from "@/path";
import { User } from "better-auth/types";
import { LucideSave } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AvatarDropdown from "./sidebar/components/avatar-dropdown";
import { Button } from "./ui/button";
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
    <header className="min-h-[53px] border-b border-gray-300 px-5 flex items-center justify-between animate-fade-from-top fixed top-0 z-20 w-full bg-background">
      <div>{user && <AvatarDropdown user={user} />}</div>
      <Button
        variant="ghost"
        className="absolute left-1/2 -translate-x-1/2"
        asChild
      >
        <Link href={homePage()} className="flex items-center gap-x-1 text-lg ">
          <LucideSave />
          Savings
        </Link>
      </Button>
      {user && <SidebarTrigger className="ml-auto" />}
    </header>
  );
};

export default Header;
