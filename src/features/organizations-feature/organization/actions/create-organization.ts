"use server";

import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
} from "@/components/utils/to-action-state";
import { auth } from "@/lib/auth";
import getAuth from "@/lib/get-auth";
import { organizationPage, signInPage } from "@/path";
import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import { Prisma } from "../../../../../generated/prisma/client";

const createOrganizationSchema = z.object({
  name: z.string().min(1, "Organization name is required").max(191),
});

const createOrganization = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  const user = await getAuth();
  if (!user) redirect(signInPage());

  try {
    const { name } = createOrganizationSchema.parse(
      Object.fromEntries(formData.entries()),
    );

    const createOrg = await auth.api.createOrganization({
      headers: await headers(),
      body: {
        name,
        slug: `${name.toLowerCase().replace(/\s+/g, "-")}-${randomUUID().slice(0, 8)}`,
      },
    });

    await auth.api.setActiveOrganization({
      headers: await headers(),
      body: { organizationId: createOrg.id },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return fromErrorToActionState(
        new Error("Organization name already exists"),
        formData,
      );
    }
    return fromErrorToActionState(error, formData);
  }
  await setCookieByKey("toast", "Organization created successfully");
  redirect(organizationPage());
};

export default createOrganization;
