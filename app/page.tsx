"use client";
import { UserButton } from "@/features/auth/components/user-button";
import { useCreateWorkSpaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useGetWorkSpaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [open, setOpen] = useCreateWorkSpaceModal();
  const { data, isLoading } = useGetWorkSpaces();
  const router = useRouter();
  const workSpaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;
    if (workSpaceId) {
      // Redirect to workspaces;
      router.replace(`/workspace/${workSpaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workSpaceId, isLoading, open, setOpen, router]);
  return (
    <div className="h-full flex justify-center items-center gap-5 flex-col">
      Logged In
      <UserButton />
    </div>
  );
}
