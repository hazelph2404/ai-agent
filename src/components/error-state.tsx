import { AlertCircle } from 'lucide-react';

interface Props {
  title: string;
  description: string;
}

const ErrorState = ({ title, description }: Props) => {
  return (
    <div className="flex flex-1 items-center justify-center px-8 py-4">
      <div className="flex max-w-sm flex-col items-center gap-y-4 rounded-lg bg-background p-8 text-center shadow-sm">
        <AlertCircle className="h-6 w-6 text-destructive" />

        <div className="flex flex-col gap-y-1">
          <h6 className="text-base font-semibold">{title}</h6>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
