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
  useSidebar,
} from "@/components/ui/sidebar";
import { getAuthUser } from "@/features/auth/actions/get-auth-user";
import { organization } from "@/lib/auth-client";
import {
  homePage,
  membershipsPage,
  organizationInvitationsPage,
  organizationPage,
  settingsPage,
} from "@/path";
import { LucideBuilding2, LucideSettings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "../constants";

export function AppSidebar() {
  const { open, setOpen, isMobile } = useSidebar();
  const [isAuth, setIsAuth] = useState(false);
  const pathname = usePathname();
  const [activeOrgId, setActiveOrgId] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const user = await getAuthUser();
      if (!user) {
        setIsAuth(false);
        setActiveOrgId(null);
        return;
      }
      setIsAuth(true);
      const { data } = await organization.getFullOrganization();
      if (data) setActiveOrgId(data.id);
      else setActiveOrgId(null);
    };
    init();
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
              {navItems
                .filter((item) =>
                  !activeOrgId ? item.href === homePage() : true,
                )
                .map((item) => (
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
                  <SidebarMenuButton
                    isActive={pathname.startsWith(organizationPage())}
                    className="h-10 group-data-[collapsible=icon]:justify-center"
                  >
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
                      className={`flex items-center gap-2 w-full ${pathname === organizationPage() ? "font-medium text-foreground" : "text-muted-foreground"}`}
                    >
                      Organization
                    </Link>
                  </DropdownMenuItem>

                  {activeOrgId && (
                    <>
                      <Separator />
                      <DropdownMenuItem>
                        <Link
                          href={organizationInvitationsPage(activeOrgId ?? "")}
                          className={`flex items-center gap-2 w-full ${pathname.includes(organizationInvitationsPage(activeOrgId ?? "")) ? "font-medium text-foreground" : "text-muted-foreground"}`}
                        >
                          Invitations
                        </Link>
                      </DropdownMenuItem>
                      <Separator />
                      <DropdownMenuItem>
                        <Link
                          href={membershipsPage(activeOrgId ?? "")}
                          className={`flex items-center gap-2 w-full ${pathname.includes(membershipsPage(activeOrgId ?? "")) ? "font-medium text-foreground" : "text-muted-foreground"}`}
                        >
                          Memberships
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
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
