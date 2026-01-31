import { FC } from "react";

interface WorkSpacePageIdProps {
  params: {
    workspaceId: string;
  };
}
const WorkSpacePageId: FC<WorkSpacePageIdProps> = async ({ params }) => {
  const workspaceId = await params;
  console.log("params", workspaceId);

  return <div>ID: {workspaceId.workspaceId}</div>;
};

export default WorkSpacePageId;
