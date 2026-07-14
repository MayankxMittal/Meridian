import { useEffect, useState } from "react";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { Button } from "@/components/ui/Button";
import { EMPLOYEES } from "@/lib/mockData";
import { Plus } from "lucide-react";

export function EmployeesPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px] text-ink-muted">
            {EMPLOYEES.length} employees across 8 departments
          </p>
        </div>
        <Button variant="primary" size="sm">
          <Plus size={14} /> Add employee
        </Button>
      </div>

      <EmployeeTable data={EMPLOYEES} loading={loading} />
    </div>
  );
}