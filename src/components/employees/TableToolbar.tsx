import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X, Mail, UserX, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import { cn } from "@/lib/utils";

const DEPARTMENTS = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Finance",
  "HR",
  "Support",
];

const STATUSES = ["active", "on-leave", "inactive"] as const;

interface TableToolbarProps {
  search: string;
  onSearchChange: (v: string) => void;
  departmentFilter: string[];
  onDepartmentFilterChange: (v: string[]) => void;
  statusFilter: string[];
  onStatusFilterChange: (v: string[]) => void;
  columnVisibility: Record<string, boolean>;
  onColumnVisibilityChange: (col: string, visible: boolean) => void;
  selectedCount: number;
  onClearSelection: () => void;
}

const COLUMN_LABELS: Record<string, string> = {
  role: "Role",
  department: "Department",
  location: "Location",
  status: "Status",
  joinedDate: "Joined date",
  salary: "Salary",
};

export function TableToolbar({
  search,
  onSearchChange,
  departmentFilter,
  onDepartmentFilterChange,
  statusFilter,
  onStatusFilterChange,
  columnVisibility,
  onColumnVisibilityChange,
  selectedCount,
  onClearSelection,
}: TableToolbarProps) {
  function toggle(list: string[], value: string, onChange: (v: string[]) => void) {
    onChange(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
  }

  return (
    <div className="relative flex h-11 items-center gap-2">
      <AnimatePresence mode="wait">
        {selectedCount > 0 ? (
          <motion.div
            key="bulk"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="flex w-full items-center gap-2 rounded-[10px] border border-primary/20 bg-primary-tint px-3 py-1.5"
          >
            <button
              onClick={onClearSelection}
              className="flex h-6 w-6 items-center justify-center rounded-[6px] text-primary-dark hover:bg-white/50"
            >
              <X size={14} />
            </button>
            <span className="text-[13px] font-medium text-primary-dark">
              {selectedCount} selected
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              <Button size="sm" variant="secondary">
                <Mail size={13} /> Email
              </Button>
              <Button size="sm" variant="secondary">
                <UserX size={13} /> Deactivate
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="text-status-danger hover:border-status-danger/30"
              >
                <Trash2 size={13} /> Delete
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="filters"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="flex w-full items-center gap-2"
          >
            <div className="relative flex-1 max-w-[280px]">
              <Search
                size={14.5}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
              />
              <input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search employees…"
                className="h-9 w-full rounded-[8px] border border-border bg-surface pl-9 pr-3 text-[13px] text-ink outline-none transition-colors duration-150 placeholder:text-ink-muted focus:border-primary/40"
              />
            </div>

            {/* Department filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "flex h-9 items-center gap-1.5 rounded-[8px] border border-border bg-surface px-3 text-[13px] font-medium text-ink-secondary transition-colors duration-150 hover:border-border-strong",
                    departmentFilter.length > 0 && "border-primary/30 text-primary-dark"
                  )}
                >
                  Department
                  {departmentFilter.length > 0 && (
                    <span className="rounded-full bg-primary-tint px-1.5 text-[11px] text-primary-dark">
                      {departmentFilter.length}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by department</DropdownMenuLabel>
                {DEPARTMENTS.map((dept) => (
                  <DropdownMenuCheckboxItem
                    key={dept}
                    checked={departmentFilter.includes(dept)}
                    onCheckedChange={() =>
                      toggle(departmentFilter, dept, onDepartmentFilterChange)
                    }
                    onSelect={(e) => e.preventDefault()}
                  >
                    {dept}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "flex h-9 items-center gap-1.5 rounded-[8px] border border-border bg-surface px-3 text-[13px] font-medium text-ink-secondary transition-colors duration-150 hover:border-border-strong",
                    statusFilter.length > 0 && "border-primary/30 text-primary-dark"
                  )}
                >
                  Status
                  {statusFilter.length > 0 && (
                    <span className="rounded-full bg-primary-tint px-1.5 text-[11px] text-primary-dark">
                      {statusFilter.length}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                {STATUSES.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilter.includes(status)}
                    onCheckedChange={() =>
                      toggle(statusFilter, status, onStatusFilterChange)
                    }
                    onSelect={(e) => e.preventDefault()}
                  >
                    {status === "on-leave" ? "On leave" : status[0].toUpperCase() + status.slice(1)}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="ml-auto">
              {/* Column visibility */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex h-9 items-center gap-1.5 rounded-[8px] border border-border bg-surface px-3 text-[13px] font-medium text-ink-secondary transition-colors duration-150 hover:border-border-strong">
                    <SlidersHorizontal size={13.5} />
                    Columns
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {Object.entries(COLUMN_LABELS).map(([key, label]) => (
                    <DropdownMenuCheckboxItem
                      key={key}
                      checked={columnVisibility[key] ?? true}
                      onCheckedChange={(v) => onColumnVisibilityChange(key, v)}
                      onSelect={(e) => e.preventDefault()}
                    >
                      {label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
