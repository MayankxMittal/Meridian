import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "secondary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-[8px] font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-40",
          size === "md" ? "h-9 px-3.5 text-[13px]" : "h-8 px-3 text-[12.5px]",
          variant === "primary" &&
            "bg-primary text-white shadow-sm hover:bg-primary-dark active:scale-[0.98]",
          variant === "secondary" &&
            "border border-border bg-surface text-ink shadow-xs hover:border-border-strong hover:shadow-sm active:scale-[0.98]",
          variant === "outline" &&
            "border border-border text-ink-secondary hover:bg-bg hover:text-ink",
          variant === "ghost" &&
            "text-ink-secondary hover:bg-bg hover:text-ink",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";