import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { DEPARTMENT_BREAKDOWN } from "@/lib/mockData";

export function DepartmentBreakdown() {
  const sorted = [...DEPARTMENT_BREAKDOWN].sort(
    (a, b) => b.headcount - a.headcount
  );
  const max = sorted[0]?.headcount ?? 1;

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Headcount by department</CardTitle>
          <p className="mt-0.5 text-[12.5px] text-ink-muted">186 total</p>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <ul className="flex flex-col gap-3.5">
          {sorted.map((dept, i) => (
            <li key={dept.department}>
              <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                <span className="font-medium text-ink">{dept.department}</span>
                <span className="tabular-nums text-ink-muted">
                  {dept.headcount}
                </span>
              </div>
              <div className="h-[6px] w-full overflow-hidden rounded-full bg-bg">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(dept.headcount / max) * 100}%` }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}