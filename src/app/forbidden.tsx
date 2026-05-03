import { Button } from "@/components/ui/button";
import { homePage } from "@/path";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="flex grow items-center justify-center px-4 text-center">
      <div className="flex flex-col items-center max-w-sm">
        <div className="w-16 h-16 rounded-xl bg-purple-50 flex items-center justify-center mb-6">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#534AB7"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
        </div>
        <p className="text-xs font-medium text-purple-700 uppercase tracking-wider mb-2">
          403 Forbidden
        </p>
        <h1 className="text-2xl font-medium mb-2">Access denied</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          You don&apos;t have permission to view this page. Contact your
          organization owner if you think this is a mistake.
        </p>
        <Button asChild>
          <Link href={homePage()}>Go home</Link>
        </Button>
      </div>
    </main>
  );
}
