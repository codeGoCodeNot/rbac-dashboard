"use client";

import { getAuthUser } from "@/features/auth/actions/get-auth-user";
import { homePage } from "@/path";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LucideSave } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AvatarDropdown from "./sidebar/components/avatar-dropdown";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { useEffect } from "react";

const Header = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { data: user, dataUpdatedAt } = useQuery({
    queryKey: ["user"],
    queryFn: getAuthUser,
    staleTime: 0,
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
  }, [pathname]);

  return (
    <header
      key={`${pathname}-${dataUpdatedAt}`}
      className="min-h-[53px] border-b border-gray-300 px-5 flex items-center justify-between animate-fade-from-top fixed top-0 z-20 w-full bg-background"
    >
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
