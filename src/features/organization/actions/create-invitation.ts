"use server";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/utils/to-action-state";
import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import { auth } from "@/lib/auth";
import { organizationInvitationsPage } from "@/path";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";

const inviteMemberSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["member", "admin"]).optional().default("member"),
});

const createInvitation = async (
  organizationId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  await getAuthOrRedirect();

  try {
    const { email, role } = inviteMemberSchema.parse(
      Object.fromEntries(formData),
    );

    await auth.api.createInvitation({
      headers: await headers(),
      body: {
        organizationId,
        email,
        role,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(organizationInvitationsPage(organizationId));
  return toActionState("SUCCESS", "Invitation sent successfully");
};

export default createInvitation;
