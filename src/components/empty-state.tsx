import Image from "next/image";

interface Props {
  title: string;
  description: string;
}

const EmptyState = ({ title, description }: Props) => {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center px-6 py-12 text-center">
      <Image
        src="/empty.svg"
        alt="Empty"
        width={240}
        height={240}
        className="mb-6 select-none opacity-90"
        priority
      />

      <h5 className="text-base font-semibold">{title}</h5>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
