import {CommandResponsiveDialog} from '@/components/ui/command';
import { Dispatch } from 'react';
interface NewAgentDialogProps {
    open: boolean, 
    setOpenDialog: Dispatch<React.SetStateAction<boolean>>;
}
const NewAgentDialog = ({open, setOpenDialog}: NewAgentDialogProps) =>{
    return (
        <div>
        <CommandResponsiveDialog title="agent" description="new agent" open={open} onOpenChange={setOpenDialog}/>
        </div>
    )
}
export default NewAgentDialog;