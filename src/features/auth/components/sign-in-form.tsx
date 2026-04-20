"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/utils/to-action-state";
import GoogleSignIn from "@/features/auth/components/google-sign-in";
import { forgotPasswordPage, signUpPage } from "@/path";
import Link from "next/link";
import { useActionState } from "react";
import signIn from "../actions/sign-in";
import PasswordInput from "./password-input";

const SignInForm = () => {
  const [actionState, action, isPending] = useActionState<
    ActionState,
    FormData
  >(signIn, EMPTY_ACTION_STATE);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
        <CardAction>
          <Button variant="link" asChild>
            <Link href={signUpPage()}>Sign Up</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
                defaultValue={actionState.payload?.get("email") as string}
              />

              {actionState.message && (
                <p className="text-sm text-red-500">{actionState.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <PasswordInput
                id="password"
                name="password"
                required
                defaultValue={actionState.payload?.get("password") as string}
              />

              {actionState.message && (
                <p className="text-sm text-red-500">{actionState.message}</p>
              )}

              <Link
                href={forgotPasswordPage()}
                className="ml-auto inline-block underline-offset-4 hover:underline text-muted-foreground text-xs"
              >
                Forgot your password?
              </Link>
            </div>
            <div className="flex-col flex gap-y-1">
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Signing In..." : "Sign In"}
              </Button>

              <GoogleSignIn title="Sign In with Google" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
