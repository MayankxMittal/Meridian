import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  createColumnHelper,
  flexRender,
  type SortingState,
  type RowSelectionState,
  type VisibilityState,
} from "@tanstack/react-table";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import { EmployeeAvatar } from "./Avatar";
import { StatusBadge } from "./StatusBadge";
import { EmployeeRowContextMenu } from "./RowContextMenu";
import { TableToolbar } from "./TableToolbar";
import { Pagination } from "./Pagination";
import { EmptyState } from "./EmptyState";
import { TableSkeleton } from "./TableSkeleton";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Employee } from "@/lib/types";
import { Eye, Pencil, Mail, UserX, Trash2 } from "lucide-react";

const columnHelper = createColumnHelper<Employee>();

interface EmployeeTableProps {
  data: Employee[];
  loading?: boolean;
}

export function EmployeeTable({ data, loading = false }: EmployeeTableProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const filteredData = useMemo(() => {
    return data.filter((emp) => {
      const matchesSearch =
        search.trim() === "" ||
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        emp.role.toLowerCase().includes(search.toLowerCase());
      const matchesDept =
        departmentFilter.length === 0 || departmentFilter.includes(emp.department);
      const matchesStatus =
        statusFilter.length === 0 || statusFilter.includes(emp.status);
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [data, search, departmentFilter, statusFilter]);

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        size: 40,
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected()
                ? true
                : table.getIsSomePageRowsSelected()
                ? "indeterminate"
                : false
            }
            onCheckedChange={(v) => table.toggleAllPageRowsSelected(v)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(v)}
            aria-label={`Select ${row.original.name}`}
          />
        ),
      }),
      columnHelper.accessor("name", {
        header: "Employee",
        size: 240,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <EmployeeAvatar name={row.original.name} />
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-ink">
                {row.original.name}
              </p>
              <p className="truncate text-[12px] text-ink-muted">
                {row.original.email}
              </p>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: (info) => (
          <span className="text-[13px] text-ink-secondary">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("department", {
        header: "Department",
        cell: (info) => (
          <span className="text-[13px] text-ink-secondary">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("location", {
        header: "Location",
        cell: (info) => (
          <span className="text-[13px] text-ink-secondary">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => <StatusBadge status={info.getValue()} />,
      }),
      columnHelper.accessor("joinedDate", {
        header: "Joined",
        cell: (info) => (
          <span className="tabular-nums text-[13px] text-ink-secondary">
            {formatDate(info.getValue())}
          </span>
        ),
      }),
      columnHelper.accessor("salary", {
        header: "Salary",
        cell: (info) => (
          <span className="tabular-nums text-[13px] font-medium text-ink">
            {formatCurrency(info.getValue())}
          </span>
        ),
      }),
      columnHelper.display({
        id: "actions",
        size: 40,
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="flex h-7 w-7 items-center justify-center rounded-[6px] text-ink-muted opacity-0 transition-all duration-150 hover:bg-bg hover:text-ink group-hover:opacity-100 data-[state=open]:opacity-100 data-[state=open]:bg-bg"
              >
                <MoreHorizontal size={15} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onSelect={() => navigate(`/employees/${row.original.id}`)}
              >
                <Eye size={14} /> View profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil size={14} /> Edit details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail size={14} /> Send email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserX size={14} /> Deactivate
              </DropdownMenuItem>
              <DropdownMenuItem destructive>
                <Trash2 size={14} /> Remove {row.original.name.split(" ")[0]}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      }),
    ],
    [navigate],
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, rowSelection, columnVisibility },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  const selectedCount = Object.keys(rowSelection).length;
  const rows = table.getRowModel().rows;

  return (
    <Card className="overflow-hidden">
      <div className="px-4 pt-3">
        <TableToolbar
          search={search}
          onSearchChange={setSearch}
          departmentFilter={departmentFilter}
          onDepartmentFilterChange={setDepartmentFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          columnVisibility={Object.fromEntries(
            table.getAllLeafColumns().map((c) => [c.id, c.getIsVisible()])
          )}
          onColumnVisibilityChange={(col, visible) =>
            table.getColumn(col)?.toggleVisibility(visible)
          }
          selectedCount={selectedCount}
          onClearSelection={() => setRowSelection({})}
        />
      </div>

      {loading ? (
        <TableSkeleton />
      ) : rows.length === 0 ? (
        <EmptyState
          onClearFilters={() => {
            setSearch("");
            setDepartmentFilter([]);
            setStatusFilter([]);
          }}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-10 bg-surface">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-border">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className="px-4 py-2.5 text-left"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <button
                          onClick={header.column.getToggleSortingHandler()}
                          className="flex items-center gap-1 text-[11.5px] font-medium uppercase tracking-wide text-ink-muted transition-colors duration-150 hover:text-ink"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getIsSorted() === "asc" ? (
                            <ArrowUp size={12} />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ArrowDown size={12} />
                          ) : (
                            <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-100" />
                          )}
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {rows.map((row) => (
                  <EmployeeRowContextMenu
                    key={row.id}
                    employeeId={row.original.id}
                    employeeName={row.original.name}
                  >
                    <motion.tr
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="group border-b border-divider transition-colors duration-100 last:border-0 hover:bg-bg data-[state=selected]:bg-primary-tint/40"
                      data-state={row.getIsSelected() ? "selected" : undefined}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-2.5">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </motion.tr>
                  </EmployeeRowContextMenu>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      {rows.length > 0 && !loading && (
        <Pagination
          page={table.getState().pagination.pageIndex + 1}
          pageCount={table.getPageCount()}
          pageSize={table.getState().pagination.pageSize}
          totalRows={filteredData.length}
          onPageChange={(p) => table.setPageIndex(p - 1)}
        />
      )}
    </Card>
  );
}