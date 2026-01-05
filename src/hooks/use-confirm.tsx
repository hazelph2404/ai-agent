import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { CommandResponsiveDialog } from "@/components/ui/command";

export const useConfirm = (
  title: string,
  description: string
): [() => JSX.Element, () => Promise<boolean>] => {
  
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise<boolean>((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    if (!promise) return;
    promise.resolve(false);
    setPromise(null);
  };

  const handleConfirm = () => {
    if (!promise) return;
    promise.resolve(true);
    setPromise(null);
  };

  const ConfirmDialog = () => (
    <CommandResponsiveDialog
      open={!!promise}
      onOpenChange={handleClose}
      title={title}
      description={description}>
      <div className="px-6 pt-6 space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="px-6 pb-6 pt-4 flex flex-col-reverse gap-2 lg:flex-row justify-end">
        <Button variant="outline" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleConfirm}>
          Confirm
        </Button>
      </div>
    </CommandResponsiveDialog>
  );

  return [ConfirmDialog, confirm];
};
