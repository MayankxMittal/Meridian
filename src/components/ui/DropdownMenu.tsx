import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const DropdownMenu = RadixDropdown.Root;
export const DropdownMenuTrigger = RadixDropdown.Trigger;

export function DropdownMenuContent({
  children,
  className,
  align = "end",
  ...props
}: RadixDropdown.DropdownMenuContentProps) {
  return (
    <RadixDropdown.Portal>
      <RadixDropdown.Content
        align={align}
        sideOffset={6}
        className={cn(
          "z-50 min-w-[190px] overflow-hidden rounded-[10px] border border-border bg-surface p-1.5 shadow-lg animate-dropdown",
          className
        )}
        {...props}
      >
        {children}
      </RadixDropdown.Content>
    </RadixDropdown.Portal>
  );
}

export function DropdownMenuItem({
  children,
  className,
  destructive,
  ...props
}: RadixDropdown.DropdownMenuItemProps & {
  children: ReactNode;
  destructive?: boolean;
}) {
  return (
    <RadixDropdown.Item
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-[7px] px-2.5 py-2 text-[13px] outline-none transition-colors duration-100",
        destructive
          ? "text-status-danger data-[highlighted]:bg-status-danger-bg"
          : "text-ink data-[highlighted]:bg-bg",
        className
      )}
      {...props}
    >
      {children}
    </RadixDropdown.Item>
  );
}

export function DropdownMenuCheckboxItem({
  children,
  className,
  ...props
}: RadixDropdown.DropdownMenuCheckboxItemProps) {
  return (
    <RadixDropdown.CheckboxItem
      className={cn(
        "flex cursor-pointer items-center justify-between rounded-[7px] px-2.5 py-2 text-[13px] text-ink outline-none transition-colors duration-100 data-[highlighted]:bg-bg",
        className
      )}
      {...props}
    >
      {children}
    </RadixDropdown.CheckboxItem>
  );
}

export function DropdownMenuLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "px-2.5 pb-1 pt-1.5 text-[11px] font-medium uppercase tracking-wide text-ink-muted",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuSeparator() {
  return <div className="my-1 h-px bg-divider" />;
}