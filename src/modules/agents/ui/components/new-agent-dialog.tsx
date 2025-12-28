import {CommandResponsiveDialog} from '@/components/ui/command';
import { Dispatch } from 'react';
import { AgentForm } from './agent-form';
interface NewAgentDialogProps {
    open: boolean, 
    setOpenDialog: Dispatch<React.SetStateAction<boolean>>;
}
const NewAgentDialog = ({open, setOpenDialog}: NewAgentDialogProps) =>{
    return (
        <CommandResponsiveDialog
        title="New Agent"
        description="Create a new agent"
        open={open}
        onOpenChange={setOpenDialog}
        className="sm:max-w-[720px]"
        contentClassName="px-7 py-9"
      >
        <AgentForm
          variant="dialog"
          onCancel={() => setOpenDialog(false)}
          onSuccess={() => setOpenDialog(false)}
        />
      </CommandResponsiveDialog>
    )
}
export default NewAgentDialog;