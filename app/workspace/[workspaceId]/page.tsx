"use client";
import { useGetWorkSpace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const WorkSpacePageId = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkSpace({ id: workspaceId });

  return <div>ID: {workspaceId}</div>;
};

export default WorkSpacePageId;
