import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { signInPage } from "@/path";
import { LucideMail } from "lucide-react";
import Link from "next/link";

const EmailChangedPage = () => {
  const steps = [
    "Open your new email inbox",
    "Click the verification link we sent you",
    "You'll be signed in automatically after verification",
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-y-6">
      <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
        <LucideMail className="w-6 h-6 text-teal-600" />
      </div>
      <div className="text-center">
        <h1 className="text-xl font-semibold">Check your new email</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Your email change has been confirmed. We've sent a verification link
          to your new email address.
        </p>
      </div>
      <Card className="w-full max-w-sm">
        <CardContent className="flex flex-col gap-y-3 pt-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-center gap-x-3 text-sm text-muted-foreground"
            >
              <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium text-foreground flex-shrink-0">
                {idx + 1}
              </div>
              <p>{step}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <Button variant="outline" asChild>
        <Link href={signInPage()}>Back to Sign In</Link>
      </Button>
    </div>
  );
};

export default EmailChangedPage;
