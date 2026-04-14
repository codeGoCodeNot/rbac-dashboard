"use client";

import { useSession } from "@/lib/auth-client";
import AvatarDropdown from "./sidebar/components/avatar-dropdown";
import { SidebarTrigger } from "./ui/sidebar";

const Header = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  return (
    <header className="border-b border-gray-300 py-2.5 px-5 flex items-center justify-between animate-fade-from-top fixed top-0 z-20 w-full bg-background">
      {!isPending && user && <AvatarDropdown user={user} />}
      <SidebarTrigger className="ml-auto" />
    </header>
  );
};

export default Header;
