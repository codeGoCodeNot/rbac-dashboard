"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionState } from "@/components/utils/to-action-state";
import { useActionState } from "react";
import signUp from "../actions/sign-up";
import GoogleSignIn from "./google-sign-in";
import PasswordInput from "./password-input";

const SignUpform = () => {
  const [actionState, action, isPending] = useActionState<
    ActionState,
    FormData
  >(signUp, {
    message: "",
    fieldErrors: {} as Record<string, string[]>,
    timestamp: Date.now(),
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                defaultValue={actionState.payload?.get("name") as string}
                required
              />
              {actionState.fieldErrors.name && (
                <p className="text-sm text-red-500">
                  {actionState.fieldErrors.name}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                defaultValue={actionState.payload?.get("email") as string}
                required
              />
              {actionState.fieldErrors.email && (
                <p className="text-sm text-red-500">
                  {actionState.fieldErrors.email}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                name="password"
                defaultValue={actionState.payload?.get("password") as string}
                required
              />
              {actionState.fieldErrors.password && (
                <p className="text-sm text-red-500">
                  {actionState.fieldErrors.password}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <PasswordInput
                id="confirm-password"
                name="confirmPassword"
                defaultValue={
                  actionState.payload?.get("confirmPassword") as string
                }
                required
              />
              {actionState.fieldErrors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {actionState.fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-1">
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Creating account..." : "Create Account"}
              </Button>
              <GoogleSignIn />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUpform;
