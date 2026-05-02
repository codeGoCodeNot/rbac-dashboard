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
import { EMPTY_ACTION_STATE } from "@/components/utils/to-action-state";
import { LucideLayers } from "lucide-react";
import { useActionState } from "react";
import createOrganization from "../actions/create-organization";

const OrganizationCreateForm = () => {
  const [actionState, action, isPending] = useActionState(
    createOrganization,
    EMPTY_ACTION_STATE,
  );

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="w-11 h-11 rounded-md bg-purple-50 flex items-center justify-center mb-2">
          <LucideLayers className="w-5 h-5 text-purple-700" />
        </div>
        <p className="text-xs font-medium text-purple-700 uppercase tracking-wider">
          Getting started
        </p>
        <CardTitle>Create organization</CardTitle>
        <CardDescription>
          Set up a savings group and invite members to contribute.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1.5">
            <Label htmlFor="name">Organization name</Label>
            <Input
              placeholder="e.g. Family Vacation Fund"
              id="name"
              name="name"
              defaultValue={actionState.payload?.get("name") as string}
            />
            {actionState.fieldErrors?.name && (
              <p className="text-xs text-destructive">
                {actionState.fieldErrors.name}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create organization"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrganizationCreateForm;
