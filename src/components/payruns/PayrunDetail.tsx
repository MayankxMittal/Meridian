import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { PayrunStatusBadge } from './PayrunStatusBadge';
import { EmptyState } from '@/components/employees/EmptyState';
import { PAYRUNS, getPayrunLineItems } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';

const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function PayrunDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const payrun = PAYRUNS.find((p) => p.id === id);

  if (!payrun) {
    return (
      <EmptyState
        title="Payrun not found"
        description="This payrun may have been removed or the link is incorrect."
      />
    );
  }

  const lineItems = getPayrunLineItems(payrun.id);

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/payruns')}
        className="inline-flex items-center gap-1.5 text-sm text-ink-secondary transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to payruns
      </button>

      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-4 py-6">
          <div>
            <p className="font-display text-2xl text-ink">{payrun.period}</p>
            <p className="mt-1 text-sm text-ink-secondary">Run on {formatDate(payrun.runDate)}</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-ink-muted">Employees</p>
              <p className="tabular-nums mt-1 font-mono text-lg text-ink">{payrun.employeesCount}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-ink-muted">Total amount</p>
              <p className="tabular-nums mt-1 font-mono text-lg text-ink">
                {formatCurrency(payrun.totalAmount)}
              </p>
            </div>
            <PayrunStatusBadge status={payrun.status} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Line items</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-divider text-left text-xs uppercase tracking-wide text-ink-muted">
                  <th className="px-6 py-3 font-medium">Employee</th>
                  <th className="px-6 py-3 font-medium">Role</th>
                  <th className="px-6 py-3 text-right font-medium">Gross</th>
                  <th className="px-6 py-3 text-right font-medium">Deductions</th>
                  <th className="px-6 py-3 text-right font-medium">Net</th>
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item, index) => (
                  <motion.tr
                    key={item.employeeId}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.03, ease: EASE_PREMIUM }}
                    className="border-b border-divider last:border-0 hover:bg-primary-tint/30"
                  >
                    <td className="px-6 py-3.5 font-medium text-ink">{item.employeeName}</td>
                    <td className="px-6 py-3.5 text-ink-secondary">{item.role}</td>
                    <td className="tabular-nums px-6 py-3.5 text-right font-mono">
                      {formatCurrency(item.gross)}
                    </td>
                    <td className="tabular-nums px-6 py-3.5 text-right font-mono text-ink-secondary">
                      -{formatCurrency(item.deductions)}
                    </td>
                    <td className="tabular-nums px-6 py-3.5 text-right font-mono font-medium text-ink">
                      {formatCurrency(item.net)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}