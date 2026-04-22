"use client";

import { Button } from "@/components/ui/button";
import { organization } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type OrganizationSwitchButtonProps = {
  organizationId: string;
  isActive?: boolean;
};

const OrganizationSwitchButton = ({
  organizationId,
  isActive,
}: OrganizationSwitchButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSwitch = async () => {
    setIsLoading(true);

    const { error } = await organization.setActive({ organizationId });
    setIsLoading(false);

    if (error) {
      toast.error("Failed to switch organization. Please try again.");
      return;
    }
    toast.success("Organization switched successfully!");
    router.refresh();
  };

  return (
    <Button
      disabled={isLoading || isActive}
      onClick={handleSwitch}
      variant="outline"
      size="sm"
      className={
        isActive
          ? "text-xs h-6 px-2 border-emerald-500 bg-emerald-500 text-white hover:bg-emerald-500 cursor-default"
          : "text-xs h-6 px-2"
      }
    >
      {isLoading ? "..." : isActive ? "Active" : "Switch"}
    </Button>
  );
};

export default OrganizationSwitchButton;
