import { cn } from "@/lib/utils";
import type { EmployeeStatus } from "@/lib/types";

const STATUS_CONFIG: Record<
  EmployeeStatus,
  { label: string; dot: string; bg: string; text: string }
> = {
  active: {
    label: "Active",
    dot: "bg-status-success",
    bg: "bg-status-success-bg",
    text: "text-status-success",
  },
  "on-leave": {
    label: "On leave",
    dot: "bg-status-warning",
    bg: "bg-status-warning-bg",
    text: "text-status-warning",
  },
  inactive: {
    label: "Inactive",
    dot: "bg-status-neutral",
    bg: "bg-status-neutral-bg",
    text: "text-status-neutral",
  },
};

export function StatusBadge({ status }: { status: EmployeeStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[12px] font-medium",
        config.bg,
        config.text
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}