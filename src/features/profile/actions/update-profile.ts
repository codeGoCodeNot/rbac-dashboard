"use server";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/utils/to-action-state";
import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import { auth } from "@/lib/auth";
import uploadFile from "@/lib/aws/upload-file";
import prisma from "@/lib/prisma";
import {
  editProfilePage,
  emailChangePage,
  profilePage,
  verifyEmailPage,
} from "@/path";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";

const updateProfileSchema = z.object({
  image: z.custom<File>().optional(),
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
});

const updateProfile = async (_actionState: ActionState, formData: FormData) => {
  const sessionUser = await getAuthOrRedirect();
  let imageUrl: string | undefined;
  let isEmailChanged = false;

  try {
    const { image, name, email } = updateProfileSchema.parse(
      Object.fromEntries(formData),
    );

    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
    });

    if (!user) return toActionState("ERROR", "User not found");

    const normalizedName = name?.trim();
    const isNameChanged = normalizedName !== user.name;

    if (isNameChanged && normalizedName) {
      await auth.api.updateUser({
        headers: await headers(),
        body: { name: normalizedName },
      });
    }

    const normalizedEmail = email?.trim().toLowerCase();
    isEmailChanged = normalizedEmail !== user.email;

    if (isEmailChanged && normalizedEmail) {
      await auth.api.changeEmail({
        headers: await headers(),
        body: { newEmail: normalizedEmail, callbackURL: emailChangePage() },
      });
    }

    if (image instanceof File && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const key = `users/${sessionUser.id}/profile`;

      await uploadFile({
        key,
        buffer,
        contentType: image.type,
      });
      imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}?t=${Date.now()}`;
      await auth.api.updateUser({
        headers: await headers(),
        body: {
          image: imageUrl,
        },
      });
    }
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(editProfilePage());
  return toActionState(
    "SUCCESS",
    isEmailChanged
      ? "Profile updated. A confirmation link has been sent to your new email. Once confirmed, a verification email will be sent to complete the process."
      : "Profile updated successfully",
  );
};

export default updateProfile;
