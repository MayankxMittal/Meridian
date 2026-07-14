import * as RadixContextMenu from "@radix-ui/react-context-menu";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const ContextMenu = RadixContextMenu.Root;
export const ContextMenuTrigger = RadixContextMenu.Trigger;

export function ContextMenuContent({
  children,
  className,
  ...props
}: RadixContextMenu.ContextMenuContentProps) {
  return (
    <RadixContextMenu.Portal>
      <RadixContextMenu.Content
        className={cn(
          "z-50 min-w-[200px] overflow-hidden rounded-[10px] border border-border bg-surface p-1.5 shadow-lg animate-dropdown",
          className
        )}
        {...props}
      >
        {children}
      </RadixContextMenu.Content>
    </RadixContextMenu.Portal>
  );
}

export function ContextMenuItem({
  children,
  className,
  destructive,
  ...props
}: RadixContextMenu.ContextMenuItemProps & {
  children: ReactNode;
  destructive?: boolean;
}) {
  return (
    <RadixContextMenu.Item
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
    </RadixContextMenu.Item>
  );
}

export function ContextMenuSeparator() {
  return <div className="my-1 h-px bg-divider" />;
}