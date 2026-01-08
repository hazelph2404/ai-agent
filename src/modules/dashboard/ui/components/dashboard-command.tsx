import {
  CommandResponsiveDialog,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";
interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const DashboardCommand = ({ open, setOpen }: Props) => {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a meeting or an agent" />
      <CommandList>
        <CommandItem>Previous meetings</CommandItem>
        <CommandItem>Previous meetings 2</CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  );
};
export default DashboardCommand;
