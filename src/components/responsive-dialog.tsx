import * as React from "react";

type ResponsiveDialogProps = React.PropsWithChildren<{
  title: string;
  description?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>;

const ResponsiveDialog = ({
  title,
  description,
  open,
  onOpenChange,
  children,
}: ResponsiveDialogProps) => {
  return (
    <div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <div>{children}</div>
      {/* later: wire open/onOpenChange to your actual Dialog component */}
    </div>
  );
};

export default ResponsiveDialog;
