"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { getAuthUser } from "@/features/auth/actions/get-auth-user";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function AppSidebar() {
  const { open, setOpen, isMobile } = useSidebar();
  const [isAuth, setIsAuth] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const check = async () => {
      const user = await getAuthUser();
      setIsAuth(!!user);
    };
    check();
  }, [pathname]);

  if (!isAuth) return null;

  return (
    <>
      {open && !isMobile && (
        <div
          className="fixed inset-0 z-[9] bg-transparent"
          onClick={() => setOpen(false)}
        />
      )}
      <Sidebar side="right" collapsible={isAuth ? "icon" : "offcanvas"}>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </>
  );
}
