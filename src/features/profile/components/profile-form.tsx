"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EMPTY_ACTION_STATE } from "@/components/utils/to-action-state";
import useActionFeedback from "@/features/hook/use-action-feedback";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "better-auth/types";
import { LucideUpload } from "lucide-react";
import { useActionState, useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import uploadAvatar from "../actions/upload-avatar";
import CropImageDialog from "./crop-image-dialog";
import createCroppedImage from "../utils/create-cropped-image";

type CroppedArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type ProfileFormProps = {
  user: User | null | undefined;
};

const ProfileForm = ({ user }: ProfileFormProps) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [actionState, action, isPending] = useActionState(
    uploadAvatar,
    EMPTY_ACTION_STATE,
  );

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    user?.image ?? null,
  );
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<CroppedArea | null>(null);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      toast.success(actionState.message);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCropSrc(URL.createObjectURL(file));
    setCropDialogOpen(true);
  };

  const onCropComplete = useCallback(
    (_: unknown, croppedAreaPixels: CroppedArea) => {
      setCroppedArea(croppedAreaPixels);
    },
    [],
  );

  const handleCropConfirm = async () => {
    if (!cropSrc || !croppedArea) return;
    const file = inputRef.current?.files?.[0];
    const mimeType = file?.type ?? "image/jpeg";
    const croppedFile = await createCroppedImage(
      cropSrc,
      croppedArea,
      mimeType,
    );
    setPreviewUrl(URL.createObjectURL(croppedFile));
    const dt = new DataTransfer();
    dt.items.add(croppedFile);
    if (fileInputRef.current) fileInputRef.current.files = dt.files;
    setCropDialogOpen(false);
  };

  return (
    <>
      <form action={action} className="w-full max-w-[450px]">
        <Card>
          <CardContent className="flex flex-col gap-4 pt-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src={previewUrl ?? user?.image ?? undefined}
                    alt={previewUrl ?? user?.name ?? "User Avatar"}
                  />
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <LucideUpload className="w-3 h-3 text-muted-foreground" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpg,image/jpeg"
                  className="hidden"
                  name="image"
                  onChange={handleImageChange}
                />{" "}
              </div>

              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG up to 4MB
                </p>
              </div>
            </div>

            <div className="border-t pt-4 flex flex-col gap-4">
              <p className="text-sm font-medium">Personal info</p>
              <div className="grid gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue={user?.name} />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={user?.email}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
      <CropImageDialog
        open={cropDialogOpen}
        onOpenChange={setCropDialogOpen}
        cropSrc={cropSrc}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        onConfirm={handleCropConfirm}
      />
    </>
  );
};

export default ProfileForm;
