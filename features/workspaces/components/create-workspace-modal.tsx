import { Input } from "@/components/ui/input";
import { useCreateWorkSpaceModal } from "../store/use-create-workspace-modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CreateWorkSpaceModal = () => {
  const [open, seOpen] = useCreateWorkSpaceModal();

  const handleClose = () => {
    seOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <Input
            placeholder="Workspace name e.g. 'Work', 'Office' "
            value={""}
            required
            autoFocus
            minLength={3}
          />
          <div className="flex justify-end">
            <Button disabled={false}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkSpaceModal;
