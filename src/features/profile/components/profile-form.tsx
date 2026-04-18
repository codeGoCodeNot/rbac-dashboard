"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "better-auth/types";
import { LucideUpload } from "lucide-react";
import { useRef } from "react";

type ProfileFormProps = {
  user: User | null | undefined;
};

const ProfileForm = ({ user }: ProfileFormProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <Card className="w-full max-w-[450px]">
      <CardContent className="flex flex-col gap-4 pt-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user?.image ?? undefined} />
              <AvatarFallback className="text-2xl">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <LucideUpload className="w-3 h-3 text-muted-foreground" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG up to 2MB
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
            <Button type="submit">Save changes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
