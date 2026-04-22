import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Loader2Icon
        role="status"
        aria-label="Loading"
        className={cn("size-6 animate-spin", className)}
        {...props}
      />
    </div>
  );
}

export { Spinner };
