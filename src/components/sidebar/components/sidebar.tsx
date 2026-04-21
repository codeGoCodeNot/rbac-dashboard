"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { getAuthUser } from "@/features/auth/actions/get-auth-user";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "../constants";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

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
      <Sidebar side="right" collapsible="icon">
        <SidebarContent>
          <SidebarGroup className="mt-15" />
          <SidebarGroup>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  {item.separator && <Separator className="my-2" />}
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="h-10 group-data-[collapsible=icon]:justify-center"
                  >
                    <Link href={item.href}>
                      {item.icon}
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </>
  );
}
