"use client";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { getAuthUser } from "@/features/auth/actions/get-auth-user";
import { settingsPage } from "@/path";
import { LucideSettings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "../constants";

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
          <SidebarGroup className="mt-auto">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === settingsPage()}
                  className="h-10 group-data-[collapsible=icon]:justify-center"
                >
                  <Link href={settingsPage()}>
                    <LucideSettings className="text-gray-600" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      Settings
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
