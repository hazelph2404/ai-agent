
import {CommandDialog, CommandInput, CommandList, CommandItem} from '@/components/ui/command'
import {Dispatch, SetStateAction} from 'react';
interface Props {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>;
}
const DashboardCommand = ({open, setOpen}: Props) => {
    return(
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Find a meeting or an agent"/>
            <CommandList>
                <CommandItem>
                    Previous meetings
                </CommandItem>
            </CommandList>
        </CommandDialog>
    )
}
export default DashboardCommand;