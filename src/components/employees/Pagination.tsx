import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  pageCount: number;
  pageSize: number;
  totalRows: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  pageCount,
  pageSize,
  totalRows,
  onPageChange,
}: PaginationProps) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalRows);

  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-3">
      <p className="text-[12.5px] text-ink-muted">
        <span className="tabular-nums font-medium text-ink">
          {start}–{end}
        </span>{" "}
        of <span className="tabular-nums font-medium text-ink">{totalRows}</span>
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="flex h-7 w-7 items-center justify-center rounded-[6px] text-ink-secondary transition-colors duration-150 hover:bg-bg disabled:pointer-events-none disabled:opacity-35"
        >
          <ChevronLeft size={15} />
        </button>

        <div className="flex items-center gap-0.5 px-1">
          {Array.from({ length: pageCount }, (_, i) => i + 1)
            .filter(
              (p) =>
                p === 1 ||
                p === pageCount ||
                Math.abs(p - page) <= 1
            )
            .map((p, idx, arr) => (
              <span key={p} className="flex items-center">
                {idx > 0 && arr[idx - 1] !== p - 1 && (
                  <span className="px-1 text-[12px] text-ink-muted">…</span>
                )}
                <button
                  onClick={() => onPageChange(p)}
                  className={cn(
                    "flex h-7 min-w-7 items-center justify-center rounded-[6px] px-1.5 text-[12.5px] font-medium tabular-nums transition-colors duration-150",
                    p === page
                      ? "bg-primary text-white"
                      : "text-ink-secondary hover:bg-bg"
                  )}
                >
                  {p}
                </button>
              </span>
            ))}
        </div>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === pageCount}
          className="flex h-7 w-7 items-center justify-center rounded-[6px] text-ink-secondary transition-colors duration-150 hover:bg-bg disabled:pointer-events-none disabled:opacity-35"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}