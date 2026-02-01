import { Button } from "@/components/ui/button";
import { useGetWorkSpace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkSpaces } from "@/features/workspaces/api/use-get-workspaces";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCreateWorkSpaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WorkspaceSwitcher() {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [_open, setOpen] = useCreateWorkSpaceModal();

  const { data: workspaces, isLoading: workspacesLoading } = useGetWorkSpaces();
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkSpace({
    id: workspaceId,
  });
  const filerWorkSpaces = workspaces?.filter(
    (workspace) => workspace?._id !== workspaceId
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="size-9 overflow-hidden relative bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
          {workspaceLoading ? (
            <Loader className="size-5 aniamte-spin shrink-0" />
          ) : (
            workspace?.name.charAt(0)?.toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
          onClick={() => router.push(`/workspace/${workspaceId}`)}
          className="cursro-pointer justify-start items-start capitalize flex-col "
        >
          {workspace?.name}
          <span className="text-xs text-muted-foreground">
            Active workspace
          </span>
        </DropdownMenuItem>
        {filerWorkSpaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            className="cursor-poiner capitalize overflow-hidden"
            onClick={() => router.push(`/workspace/${workspace?._id}`)}
          >
            <div className="shrink-0 size-9 relative overflow-hideen bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2">
              {workspace?.name.charAt(0).toUpperCase()}
            </div>
            <p className="truncate">{workspace?.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className="size-9 relative overflow-hideen bg-[#f2f2f2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
            <Plus />
          </div>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
