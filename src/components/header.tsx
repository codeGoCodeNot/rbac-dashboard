"use client";

import { getAuthUser } from "@/features/auth/actions/get-auth-user";
import { homePage } from "@/path";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LucideSave } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import AvatarDropdown from "./sidebar/components/avatar-dropdown";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

const Header = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getAuthUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (!user) {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  }, [pathname]);

  if (isPending) return null;
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
