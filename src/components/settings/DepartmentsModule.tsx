import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Plus, Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { DepartmentCard } from "./DepartmentCard";
import { DepartmentFormDialog } from "./DepartmentFormDialog";
import { INITIAL_DEPARTMENTS } from "@/lib/mockData";
import type { Department } from "@/lib/types";

export function DepartmentsModule() {
  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [formOpen, setFormOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Department | null>(null);

  function handleAdd() {
    setEditingDept(null);
    setFormOpen(true);
  }

  function handleEdit(dept: Department) {
    setEditingDept(dept);
    setFormOpen(true);
  }

  function handleSubmit(values: { name: string; code: string; description: string }) {
    if (editingDept) {
      setDepartments((prev) =>
        prev.map((d) => (d.id === editingDept.id ? { ...d, ...values } : d))
      );
    } else {
      const newDept: Department = {
        id: `DEPT-${String(departments.length + 1).padStart(2, "0")}`,
        headCount: 0,
        createdAt: new Date().toISOString().slice(0, 10),
        ...values,
      };
      setDepartments((prev) => [...prev, newDept]);
    }
  }

  function handleDelete() {
    if (!deleteTarget) return;
    setDepartments((prev) => prev.filter((d) => d.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[13px] text-ink-muted">
          {departments.length} department{departments.length !== 1 ? "s" : ""}
        </p>
        <Button variant="primary" size="sm" onClick={handleAdd}>
          <Plus size={14} /> Add department
        </Button>
      </div>

      {departments.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg">
            <Building2 size={20} strokeWidth={1.75} className="text-ink-muted" />
          </div>
          <div className="text-center">
            <p className="text-[14px] font-medium text-ink">No departments yet</p>
            <p className="mt-0.5 text-[13px] text-ink-muted">
              Create your first department to get started
            </p>
          </div>
          <Button size="sm" variant="secondary" onClick={handleAdd}>
            <Plus size={13} /> Add department
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {departments.map((dept, i) => (
              <DepartmentCard
                key={dept.id}
                department={dept}
                index={i}
                onEdit={() => handleEdit(dept)}
                onDelete={() => setDeleteTarget(dept)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <DepartmentFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        department={editingDept}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title={`Delete ${deleteTarget?.name ?? "department"}?`}
        description="This will permanently remove the department. Employees assigned to it won't be deleted, but will need to be reassigned."
        confirmLabel="Delete department"
        onConfirm={handleDelete}
      />
    </div>
  );
}