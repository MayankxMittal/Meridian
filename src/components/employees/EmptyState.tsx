import { UserSearch } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onClearFilters?: () => void;
}

export function EmptyState({
  title = "No employees found",
  description = "Try adjusting your search or filters",
  onClearFilters,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg">
        <UserSearch size={20} strokeWidth={1.75} className="text-ink-muted" />
      </div>
      <div className="text-center">
        <p className="text-[14px] font-medium text-ink">{title}</p>
        <p className="mt-0.5 text-[13px] text-ink-muted">{description}</p>
      </div>
      {onClearFilters && (
        <Button size="sm" variant="secondary" onClick={onClearFilters}>
          Clear filters
        </Button>
      )}
    </div>
  );
}
