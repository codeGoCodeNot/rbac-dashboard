"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LucideEye, LucideEyeOff } from "lucide-react";
import { useState } from "react";

type PasswordInputProps = React.ComponentProps<typeof Input>;

const PasswordInput = ({ className, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("pr-10 [&::-ms-reveal]:hidden", className)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        title={showPassword ? "Hide password" : "Show password"}
        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transform"
      >
        {showPassword ? (
          <LucideEyeOff className="w-4 h-4" />
        ) : (
          <LucideEye className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
