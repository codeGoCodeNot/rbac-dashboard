"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { getAuthUser } from "@/features/auth/actions/get-auth-user";
import {
  organizationInvitationsPage,
  organizationPage,
  settingsPage,
} from "@/path";
import { LucideBuilding2, LucideSettings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "../constants";
import { organization } from "@/lib/auth-client";

export function AppSidebar() {
  const { open, setOpen, isMobile } = useSidebar();
  const [isAuth, setIsAuth] = useState(false);
  const pathname = usePathname();
  const [activeOrgId, setActiveOrgId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuth) return;
    const fetchActiveOrg = async () => {
      const { data } = await organization.getFullOrganization();
      if (data) setActiveOrgId(data.id);
    };
    fetchActiveOrg();
  }, [isAuth]);

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
                  {item.separator && (
                    <div className="h-px bg-border mx-2 my-1" />
                  )}
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
          <div className="h-px bg-border mx-2 my-1" />
          <SidebarGroup>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <LucideBuilding2 className="text-purple-700" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      Organization
                    </span>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link
                      href={organizationPage()}
                      className="flex items-center gap-2"
                    >
                      Organization
                    </Link>
                  </DropdownMenuItem>
                  <Separator />
                  <DropdownMenuItem>
                    <Link
                      href={organizationInvitationsPage(activeOrgId ?? "")}
                      className="flex items-center gap-2"
                    >
                      Invitations
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
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
