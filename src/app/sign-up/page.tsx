import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordPage } from "@/path";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

const SignUpPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
                <Link
                  href={forgotPasswordPage()}
                  className="ml-auto inline-block underline-offset-4 hover:underline text-muted-foreground text-xs"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Create Account
          </Button>
          <Button
            variant="outline"
            className="w-full flex gap-x-2 items-center"
          >
            <span>Create Account with Google</span>
            <FaGoogle className="text-[#4285f4]" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
