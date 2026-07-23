import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Label({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "mb-1.5 block text-[12.5px] font-medium text-ink-secondary",
        className
      )}
      {...props}
    />
  );
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-9 w-full rounded-[8px] border border-border bg-surface px-3 text-[13px] text-ink outline-none transition-colors duration-150 placeholder:text-ink-muted focus:border-primary/40",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-[8px] border border-border bg-surface px-3 py-2 text-[13px] text-ink outline-none transition-colors duration-150 placeholder:text-ink-muted focus:border-primary/40",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";