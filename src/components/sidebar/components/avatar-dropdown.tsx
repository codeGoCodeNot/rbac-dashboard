"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";
import { profilePage, signInPage } from "@/path";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "better-auth/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type AvatarDropdownProps = {
  user: User;
};

const AvatarDropdown = ({ user }: AvatarDropdownProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await signOut();
    setLoading(false);

    if (error) {
      return toast.error("Failed to log out. Please try again.");
    } else {
      queryClient.removeQueries({ queryKey: ["user"] });
      toast.success("Logged out successfully.");
      router.push(signInPage());
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage
              src={user?.image ?? undefined}
              alt={user?.name ?? "User Avatar"}
              className="grayscale"
            />
            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <DropdownMenuSeparator />
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={profilePage()}>Profile</Link>
          </DropdownMenuItem>{" "}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            disabled={loading}
            className="text-destructive focus:text-destructive"
          >
            {loading ? "Logging out..." : "Log out"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
