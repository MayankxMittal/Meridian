export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="divide-y divide-divider">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3.5">
          <div className="h-4 w-4 shrink-0 animate-pulse rounded-[5px] bg-divider" />
          <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-divider" />
          <div className="flex flex-1 flex-col gap-1.5">
            <div
              className="h-3 animate-pulse rounded-full bg-divider"
              style={{ width: `${120 + (i % 3) * 30}px` }}
            />
            <div className="h-2.5 w-[160px] animate-pulse rounded-full bg-divider" />
          </div>
          <div className="h-5 w-20 shrink-0 animate-pulse rounded-full bg-divider" />
          <div className="h-3 w-24 shrink-0 animate-pulse rounded-full bg-divider" />
          <div className="h-3 w-16 shrink-0 animate-pulse rounded-full bg-divider" />
        </div>
      ))}
    </div>
  );
}