"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EMPTY_ACTION_STATE } from "@/components/utils/to-action-state";
import { LucideUsers } from "lucide-react";
import { useActionState } from "react";
import createOrganization from "../actions/create-organization";

const OrganizationCreateForm = () => {
  const [actionState, action, isPending] = useActionState(
    createOrganization,
    EMPTY_ACTION_STATE,
  );

  return (
    <div className="bg-background border border-border rounded-xl p-6 w-full max-w-md">
      <div className="w-11 h-11 rounded-md bg-purple-50 flex items-center justify-center mb-4">
        <LucideUsers className="w-5 h-5 text-purple-700" />
      </div>
      <h2 className="text-lg font-medium mb-1">Create organization</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Set up a savings group and invite members to contribute.
      </p>
      <form action={action} className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1.5">
          <Label>Organization name</Label>
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
    </div>
  );
};

export default OrganizationCreateForm;
