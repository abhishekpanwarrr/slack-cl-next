"use client";
import { UserButton } from "@/features/auth/components/user-button";
import { useCreateWorkSpaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useGetWorkSpaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";

export default function Home() {
  const [open, setOpen] = useCreateWorkSpaceModal();
  const { data, isLoading } = useGetWorkSpaces();
  console.log("data,", data);
  console.log("isLoading,", isLoading);
  const workSpaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;
    if (workSpaceId) {
      // Redirect to workspaces;
    } else if (!open) {
      setOpen(true);
    }
  }, [workSpaceId, isLoading, open, setOpen]);
  return (
    <div className="h-full flex justify-center items-center gap-5 flex-col">
      Logged In
      <UserButton />
    </div>
  );
}
