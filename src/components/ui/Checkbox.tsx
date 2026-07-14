import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked: boolean | "indeterminate";
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  "aria-label"?: string;
}

export function Checkbox({
  checked,
  onCheckedChange,
  className,
  ...rest
}: CheckboxProps) {
  return (
    <RadixCheckbox.Root
      checked={checked}
      onCheckedChange={(v) => onCheckedChange(v === true)}
      className={cn(
        "flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border border-border-strong bg-surface transition-colors duration-150",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
        "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        className
      )}
      {...rest}
    >
      <RadixCheckbox.Indicator className="text-white">
        {checked === "indeterminate" ? (
          <Minus size={11} strokeWidth={3} />
        ) : (
          <Check size={11} strokeWidth={3} />
        )}
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}