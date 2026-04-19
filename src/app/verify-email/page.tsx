import Heading from "@/components/heading";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ResendVerificationButton from "@/features/verification-email/components/resend-verification-button";
import VerifyEmailRedirect from "@/features/verification-email/components/verify-email-redirect";
import getAuth from "@/lib/get-auth";
import { homePage, signInPage } from "@/path";
import { LucideAlertCircle, LucideMail } from "lucide-react";
import { redirect } from "next/navigation";

const VerifyEmailPage = async () => {
  const user = await getAuth();

  if (!user) redirect(signInPage());
  if (user.emailVerified) redirect(homePage());

  const emailContent = [
    "Open your email inbox",
    "Click the verification link",
    "You'll be redirected automatically",
  ];

  return (
    <div className="flex flex-col gap-y-8 flex-1">
      <VerifyEmailRedirect />
      <Heading
        title="Verify Your Email"
        description="Verify your email to start using our service"
      />
      <div className="flex flex-col flex-1 items-center">
        <div className="flex flex-col gap-y-6 w-full max-w-[560px]">
          <div>
            <h1 className="text-xl font-medium">
              Welcome to Our App, {user.name.split(" ")[0]}!
            </h1>
          </div>

          <Alert className="max-w-[560px] border-yellow-500/50 bg-yellow-50 text-yellow-800">
            <LucideAlertCircle />
            <AlertDescription className="flex gap-x-1">
              <span>
                {user.emailVerified ? "Email verified" : "Email not verified"}
              </span>
              <ResendVerificationButton email={user.email} />
            </AlertDescription>
          </Alert>

          <Card>
            <CardContent>
              <div className="flex items-center gap-x-4">
                <div className="w-9 h-9 bg-teal-50 flex items-center justify-center flex-shrink-0">
                  <LucideMail className="text-teal-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">Check your inbox</p>
                  <p className="text-xs text-muted-foreground">
                    Sent to {user.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-y-2 mt-4">
                {emailContent.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-x-2 text-xs text-muted-foreground"
                  >
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium text-foreground flex-shrink-0">
                      {idx + 1}.
                    </div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <Button variant="outline" size="sm">
                  <a href="mailto:" target="_blank" rel="noopener noreferrer">
                    Open Email App
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
