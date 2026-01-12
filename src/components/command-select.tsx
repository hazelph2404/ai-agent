"use client";

import { useState, ReactNode } from "react";
import { ChevronsUpDownIcon, CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";

interface Option {
  id: string;
  value: string;
  children: ReactNode;
}

interface Props {
  options: Option[];
  value: string;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}

const CommandSelect = ({
  options,
  value,
  onSelect,
  onSearch,
  placeholder = "Select an option",
  isSearchable = true,
  className,
}: Props) => {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);
  const handleOpenChange = (open: boolean) => {
    onSearch?.("");
    setOpen(open);
  };
  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "h-9 justify-between px-2 font-normal",
          !selectedOption && "text-muted-foreground",
          className,
        )}
        onClick={() => setOpen(true)}
      >
        <div className="truncate">
          {selectedOption?.children ?? placeholder}
        </div>
        <ChevronsUpDownIcon className="h-4 w-4 opacity-50" />
      </Button>

      <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={open}
        onOpenChange={handleOpenChange}
      >
        {isSearchable && (
          <CommandInput placeholder="Search..." onValueChange={onSearch} />
        )}

        <CommandList>
          <CommandEmpty>
            {" "}
            <span className="text-muted-foreground">No results found. </span>
          </CommandEmpty>

          {options.map((option) => (
            <CommandItem
              key={option.id}
              value={option.value}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
              }}
              className="flex items-center justify-between py-2 cursor-pointer"
            >
              <div className="flex items-center gap-2">{option.children}</div>

              <CheckIcon
                className={cn(
                  "h-4 w-4 text-primary",
                  option.value === value ? "opacity-100" : "opacity-0",
                )}
              />
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};

export default CommandSelect;
