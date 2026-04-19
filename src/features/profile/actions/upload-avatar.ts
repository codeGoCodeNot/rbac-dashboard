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
import { editProfilePage } from "@/path";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";

const updateProfileSchema = z.object({
  image: z.custom<File>().optional(),
});

const uploadAvatar = async (_actionState: ActionState, formData: FormData) => {
  const sessionUser = await getAuthOrRedirect();
  let imageUrl: string | undefined;

  try {
    const { image } = updateProfileSchema.parse(Object.fromEntries(formData));

    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
    });

    if (!user) return toActionState("ERROR", "User not found");

    if (image instanceof File && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const key = `users/${sessionUser.id}/profile`;

      await uploadFile({
        key,
        buffer,
        contentType: image.type,
      });
      imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
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
  return toActionState("SUCCESS", "Profile updated successfully");
};

export default uploadAvatar;
