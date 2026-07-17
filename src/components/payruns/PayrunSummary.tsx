/**
 * PayrunSummary
 * ---------------------------------------------------------------------------
 * A premium "before you dive into individual employees" overview for a
 * selected Pay Run. Uses the same theme-aware design system as the rest
 * of the app.
 * ---------------------------------------------------------------------------
 */

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Wallet,
  HandCoins,
  MinusCircle,
  Building2,
  Percent,
  RefreshCw,
  FileDown,
  FileSpreadsheet,
  ChevronDown,
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PayrollDistributionItem {
  label: string;
  amount: number;
  color?: string;
}

export interface PaymentStatusCounts {
  paid: number;
  pending: number;
  onHold: number;
  failed: number;
}

export interface PayrunSummaryData {
  totalEmployees: number;
  totalPayrollCost: number;
  totalNetSalaryPaid: number;
  totalDeductions: number;
  totalEmployerContribution: number;
  averageSalary: number;
  distribution: PayrollDistributionItem[];
  paymentStatus: PaymentStatusCounts;
}

interface PayrunSummaryProps {
  data: PayrunSummaryData;
  isRegenerating?: boolean;
  onGeneratePayroll?: () => void;
  onDownloadPayslips?: () => void;
  onExportReport?: (format: 'xlsx' | 'pdf') => void;
}

// ---------------------------------------------------------------------------
// Local design tokens (theme-aware)
// ---------------------------------------------------------------------------

const TOKENS: React.CSSProperties = {
  ['--surface-0' as string]: 'var(--color-bg)',
  ['--surface-1' as string]: 'var(--color-surface)',
  ['--surface-2' as string]: 'var(--color-surface-raised)',
  ['--surface-3' as string]: 'var(--color-surface-hover)',
  ['--hairline' as string]: 'var(--color-border)',
  ['--hairline-strong' as string]: 'var(--color-border-strong)',
  ['--ink-0' as string]: 'var(--color-ink)',
  ['--ink-1' as string]: 'var(--color-ink-secondary)',
  ['--ink-2' as string]: 'var(--color-ink-muted)',
  ['--bottle-950' as string]: 'var(--color-primary-dark)',
  ['--bottle-800' as string]: 'var(--color-primary)',
  ['--bottle-600' as string]: 'var(--color-primary-light)',
  ['--bottle-400' as string]: 'var(--color-primary-light)',
  ['--bottle-soft' as string]: 'var(--color-primary-tint)',
  ['--amber' as string]: 'var(--color-status-warning)',
  ['--slate' as string]: 'var(--color-status-neutral)',
  ['--rose' as string]: 'var(--color-status-danger)',
  ['--font-display' as string]: "var(--font-display)",
  ['--font-body' as string]: "var(--font-sans)",
  ['--font-mono' as string]: "var(--font-mono)",
} as React.CSSProperties;

const DEFAULT_DISTRIBUTION_COLORS: Record<string, string> = {
  'Net Salary': 'var(--bottle-400)',
  EPF: 'var(--bottle-600)',
  ESI: 'var(--bottle-800)',
  'Income Tax (TDS)': 'var(--amber)',
  'Other Deductions': 'var(--slate)',
};

// ---------------------------------------------------------------------------
// Count-up number
// ---------------------------------------------------------------------------

function useCountUp(target: number, durationMs = 900) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const start = startedRef.current ? value : 0;
    const startTime = performance.now();
    let raf: number;

    function tick(now: number) {
      const t = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(start + (target - start) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    startedRef.current = true;
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, durationMs]);

  return value;
}

// ---------------------------------------------------------------------------
// KPI cards
// ---------------------------------------------------------------------------

function KpiCard({
  icon: Icon,
  label,
  value,
  format,
  index,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: number;
  format: 'currency' | 'number';
  index: number;
}) {
  const animated = useCountUp(value);
  const display =
    format === 'currency'
      ? formatCurrency(Math.round(animated))
      : Math.round(animated).toLocaleString('en-IN');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: EASE_PREMIUM }}
      className="rounded-2xl border p-5 transition-colors"
      style={{ backgroundColor: 'var(--surface-1)', borderColor: 'var(--hairline)' }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--hairline-strong)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--hairline)')}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--ink-2)' }}>
          {label}
        </span>
        <div
          className="flex h-7 w-7 items-center justify-center rounded-lg"
          style={{ backgroundColor: 'var(--bottle-soft)' }}
        >
          <Icon className="h-3.5 w-3.5" style={{ color: 'var(--bottle-400)' }} />
        </div>
      </div>
      <p
        className="tabular-nums text-2xl font-semibold"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-0)' }}
      >
        {display}
      </p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Donut distribution
// ---------------------------------------------------------------------------

function PayrollDonut({ items }: { items: PayrollDistributionItem[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const total = items.reduce((sum, i) => sum + i.amount, 0);
  const r = 62;
  const circumference = 2 * Math.PI * r;

  let cumulative = 0;
  const segments = items.map((item) => {
    const pct = total > 0 ? item.amount / total : 0;
    const dash = pct * circumference;
    const offset = -cumulative * circumference;
    cumulative += pct;
    return { ...item, pct, dash, offset, color: item.color ?? DEFAULT_DISTRIBUTION_COLORS[item.label] ?? 'var(--slate)' };
  });

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
      <div className="relative flex h-44 w-44 shrink-0 items-center justify-center">
        <svg viewBox="0 0 144 144" className="h-44 w-44 -rotate-90">
          <circle cx="72" cy="72" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="16" />
          {segments.map((seg, i) => (
            <motion.circle
              key={seg.label}
              cx="72"
              cy="72"
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={hovered === i ? 19 : 16}
              strokeLinecap="butt"
              strokeDasharray={`${seg.dash} ${circumference - seg.dash}`}
              initial={{ strokeDashoffset: 0, opacity: 0 }}
              animate={{ strokeDashoffset: seg.offset, opacity: hovered === null || hovered === i ? 1 : 0.45 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: EASE_PREMIUM }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease' }}
            />
          ))}
        </svg>
        <div className="absolute flex flex-col items-center px-6 text-center">
          <span
            className="tabular-nums text-lg"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-0)' }}
          >
            {formatCurrency(total)}
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-wide" style={{ color: 'var(--ink-2)' }}>
            Total cost
          </span>
        </div>
      </div>

      <div className="w-full flex-1 space-y-1">
        {segments.map((seg, i) => (
          <div
            key={seg.label}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 transition-colors"
            style={{ backgroundColor: hovered === i ? 'var(--surface-2)' : 'transparent' }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-sm" style={{ color: 'var(--ink-1)' }}>
                {seg.label}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="tabular-nums text-sm font-medium"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-0)' }}
              >
                {formatCurrency(seg.amount)}
              </span>
              <span
                className="tabular-nums w-10 text-right text-xs"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-2)' }}
              >
                {Math.round(seg.pct * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Payment status
// ---------------------------------------------------------------------------

const STATUS_META = {
  paid: { label: 'Paid', color: 'var(--status-paid)' },
  pending: { label: 'Pending', color: 'var(--status-pending)' },
  onHold: { label: 'On hold', color: 'var(--status-neutral)' },
  failed: { label: 'Failed', color: 'var(--status-danger)' },
} as const;

function PaymentStatusPanel({ status }: { status: PaymentStatusCounts }) {
  const total = status.paid + status.pending + status.onHold + status.failed || 1;
  const order: (keyof PaymentStatusCounts)[] = ['paid', 'pending', 'onHold', 'failed'];

  return (
    <div>
      <div
        className="flex h-2.5 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: 'var(--surface-2)' }}
      >
        {order.map((key, i) => {
          const pct = (status[key] / total) * 100;
          if (pct === 0) return null;
          return (
            <motion.div
              key={key}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: EASE_PREMIUM }}
              style={{ backgroundColor: STATUS_META[key].color }}
            />
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {order.map((key) => (
          <div
            key={key}
            className="flex items-center justify-between rounded-xl border px-3.5 py-3"
            style={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--hairline)' }}
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: STATUS_META[key].color }} />
              <span className="text-xs" style={{ color: 'var(--ink-1)' }}>
                {STATUS_META[key].label}
              </span>
            </div>
            <span
              className="tabular-nums text-sm font-semibold"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-0)' }}
            >
              {status[key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Quick actions
// ---------------------------------------------------------------------------

function QuickActions({
  isRegenerating,
  onGeneratePayroll,
  onDownloadPayslips,
  onExportReport,
}: Pick<PayrunSummaryProps, 'isRegenerating' | 'onGeneratePayroll' | 'onDownloadPayslips' | 'onExportReport'>) {
  const [exportOpen, setExportOpen] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setExportOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={onGeneratePayroll}
        disabled={isRegenerating}
        className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ backgroundColor: 'var(--bottle-600)', color: 'var(--button-text-inverse)' }}
      >
        <RefreshCw className={cn('h-4 w-4', isRegenerating && 'animate-spin')} />
        {isRegenerating ? 'Regenerating…' : 'Regenerate payroll'}
      </button>

      <button
        onClick={onDownloadPayslips}
        className="flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-hover"
        style={{ borderColor: 'var(--hairline-strong)', color: 'var(--ink-0)' }}
      >
        <FileDown className="h-4 w-4" />
        Download payslips
      </button>

      <div className="relative" ref={exportRef}>
        <button
          onClick={() => setExportOpen((v) => !v)}
          className="flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-hover"
          style={{ borderColor: 'var(--hairline-strong)', color: 'var(--ink-0)' }}
        >
          <FileSpreadsheet className="h-4 w-4" />
          Export report
          <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', exportOpen && 'rotate-180')} />
        </button>

        <AnimatePresence>
          {exportOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-full z-10 mt-2 w-40 overflow-hidden rounded-xl border shadow-xl"
              style={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--hairline-strong)' }}
            >
              {(['xlsx', 'pdf'] as const).map((format) => (
                <button
                  key={format}
                  onClick={() => {
                    onExportReport?.(format);
                    setExportOpen(false);
                  }}
                  className="block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-surface-hover"
                  style={{ color: 'var(--ink-1)' }}
                >
                  {format === 'xlsx' ? 'Excel (.xlsx)' : 'PDF document'}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section wrapper
// ---------------------------------------------------------------------------

function Panel({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn('rounded-2xl border p-6', className)}
      style={{ backgroundColor: 'var(--surface-1)', borderColor: 'var(--hairline)' }}
    >
      <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--ink-2)' }}>
        {title}
      </h3>
      {children}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function PayrunSummary({
  data,
  isRegenerating,
  onGeneratePayroll,
  onDownloadPayslips,
  onExportReport,
}: PayrunSummaryProps) {
  return (
    <div
      className="space-y-4"
      style={{ ...TOKENS, backgroundColor: 'var(--surface-0)', fontFamily: 'var(--font-body)' }}
    >
      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard icon={Users} label="Employees processed" value={data.totalEmployees} format="number" index={0} />
        <KpiCard icon={Wallet} label="Total payroll cost" value={data.totalPayrollCost} format="currency" index={1} />
        <KpiCard icon={HandCoins} label="Net salary paid" value={data.totalNetSalaryPaid} format="currency" index={2} />
        <KpiCard icon={MinusCircle} label="Total deductions" value={data.totalDeductions} format="currency" index={3} />
        <KpiCard
          icon={Building2}
          label="Employer contribution"
          value={data.totalEmployerContribution}
          format="currency"
          index={4}
        />
        <KpiCard icon={Percent} label="Average salary" value={data.averageSalary} format="currency" index={5} />
      </div>

      {/* Distribution + Payment status */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="Payroll Distribution">
          <PayrollDonut items={data.distribution} />
        </Panel>
        <Panel title="Payment Status">
          <PaymentStatusPanel status={data.paymentStatus} />
        </Panel>
      </div>

      {/* Quick actions */}
      <Panel title="Quick Actions">
        <QuickActions
          isRegenerating={isRegenerating}
          onGeneratePayroll={onGeneratePayroll}
          onDownloadPayslips={onDownloadPayslips}
          onExportReport={onExportReport}
        />
      </Panel>
    </div>
  );
} 