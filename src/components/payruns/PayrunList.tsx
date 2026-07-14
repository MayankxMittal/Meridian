import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/Card';
import { PayrunStatusBadge } from './PayrunStatusBadge';
import { EmptyState } from '@/components/employees/EmptyState';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import type { Payrun } from '@/lib/types';

interface PayrunListProps {
  payruns: Payrun[];
  loading?: boolean;
}

const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function PayrunList({ payruns, loading }: PayrunListProps) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-divider" />
        ))}
      </div>
    );
  }

  if (payruns.length === 0) {
    return (
      <EmptyState
        title="No payruns yet"
        description="Scheduled and completed payruns will show up here once you run payroll."
      />
    );
  }

  return (
    <div className="space-y-3">
      {payruns.map((payrun, index) => (
        <motion.div
          key={payrun.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.04, ease: EASE_PREMIUM }}
        >
          <Card
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/payruns/${payrun.id}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') navigate(`/payruns/${payrun.id}`);
            }}
            className={cn('cursor-pointer transition-colors hover:border-primary/30 hover:bg-primary-tint/40')}
          >
            <CardContent className="flex items-center justify-between gap-6 py-4">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-ink">{payrun.period}</p>
                <p className="mt-0.5 text-sm text-ink-secondary">
                  Run on {formatDate(payrun.runDate)} · {payrun.employeesCount} employees
                </p>
              </div>
              <div className="flex items-center gap-6">
                <p className="tabular-nums text-right font-mono text-sm text-ink">
                  {formatCurrency(payrun.totalAmount)}
                </p>
                <PayrunStatusBadge status={payrun.status} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}