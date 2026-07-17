/**
 * PayrunEmployeeDrawer
 * ---------------------------------------------------------------------------
 * A premium right-side slide-over showing one employee's payrun detail.
 * Supports both light and dark themes with CSS variables.
 * ---------------------------------------------------------------------------
 */

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Wallet,
  TrendingUp,
  MinusCircle,
  Building2,
  CalendarCheck,
  FileText,
  Download,
} from 'lucide-react';
import { cn, formatCurrency, formatDate } from '@/lib/utils';

const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PayrollStatus = 'paid' | 'pending' | 'on-hold';

export interface PayrunEmployeeOverview {
  avatarUrl?: string;
  name: string;
  employeeCode: string;
  department: string;
  designation: string;
  payrollMonth: string;
  status: PayrollStatus;
}

export interface PayrunSalarySummary {
  annualCTC: number;
  monthlyCTC: number;
  grossSalary: number;
  netSalary: number;
  paymentDate: string;
}

export interface PayrunEarnings {
  basic: number;
  hra: number;
  specialAllowance: number;
  bonus: number;
  overtime: number;
  reimbursements: number;
}

export interface PayrunDeductions {
  epf: number;
  esi: number;
  professionalTax: number;
  incomeTax: number;
  lwf: number;
  loanAdvance: number;
  otherDeductions: number;
}

export interface PayrunEmployerContributions {
  employerEpf: number;
  employerEsi: number;
}

export interface PayrunAttendance {
  workingDays: number;
  presentDays: number;
  paidLeave: number;
  lossOfPay: number;
}

export interface PayrunEmployeeDrawerData {
  overview: PayrunEmployeeOverview;
  salary: PayrunSalarySummary;
  earnings: PayrunEarnings;
  deductions: PayrunDeductions;
  employerContributions: PayrunEmployerContributions;
  attendance: PayrunAttendance;
  payslipUrl?: string;
}

interface PayrunEmployeeDrawerProps {
  data: PayrunEmployeeDrawerData | null;
  open: boolean;
  onClose: () => void;
  onViewPayslip?: () => void;
  onDownloadPayslip?: () => void;
}

// ---------------------------------------------------------------------------
// Status configuration
// ---------------------------------------------------------------------------

const STATUS_CONFIG: Record<PayrollStatus, { label: string; color: string; soft: string }> = {
  paid: { 
    label: 'Paid', 
    color: 'var(--status-paid)', 
    soft: 'var(--status-paid-soft)' 
  },
  pending: { 
    label: 'Pending', 
    color: 'var(--status-pending)', 
    soft: 'var(--status-pending-soft)' 
  },
  'on-hold': { 
    label: 'On hold', 
    color: 'var(--status-hold)', 
    soft: 'var(--status-hold-soft)' 
  },
};

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function StampBadge({ status }: { status: PayrollStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <div
      className="relative flex h-14 w-14 shrink-0 -rotate-6 items-center justify-center rounded-full border-[1.5px] border-dashed text-center transition-transform"
      style={{
        borderColor: cfg.color,
        boxShadow: `0 0 0 4px ${cfg.soft}`,
      }}
    >
      <span
        className="font-mono text-[9px] font-semibold uppercase leading-tight tracking-widest"
        style={{ color: cfg.color, fontFamily: 'var(--font-mono)' }}
      >
        {cfg.label.split(' ').map((w) => (
          <span key={w} className="block">
            {w}
          </span>
        ))}
      </span>
    </div>
  );
}

function SectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="rounded-2xl border p-5"
      style={{
        backgroundColor: 'var(--surface-card)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
        <h3
          className="text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: 'var(--text-muted)' }}
        >
          {title}
        </h3>
      </div>
      <div className="space-y-0">{children}</div>
    </section>
  );
}

function Row({
  label,
  value,
  muted,
  divider = true,
}: {
  label: string;
  value: string;
  muted?: boolean;
  divider?: boolean;
}) {
  return (
    <div
      className={cn('flex items-center justify-between py-2.5', divider && 'border-b last:border-0')}
      style={{ borderColor: 'var(--border-color)' }}
    >
      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </span>
      <span
        className="tabular-nums text-sm font-medium"
        style={{
          fontFamily: 'var(--font-mono)',
          color: muted ? 'var(--text-secondary)' : 'var(--text-primary)',
        }}
      >
        {value}
      </span>
    </div>
  );
}

function AttendanceRing({ present, working }: { present: number; working: number }) {
  const pct = working > 0 ? Math.min(present / working, 1) : 0;
  const r = 30;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - pct);

  return (
    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
      <svg viewBox="0 0 72 72" className="h-20 w-20 -rotate-90">
        <circle cx="36" cy="36" r={r} fill="none" stroke="var(--border-strong)" strokeWidth="5" />
        <motion.circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.15 }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          className="tabular-nums text-sm font-semibold"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}
        >
          {Math.round(pct * 100)}%
        </span>
      </div>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-xl border px-3 py-2.5"
      style={{ 
        backgroundColor: 'var(--surface-hover)',
        borderColor: 'var(--border-color)' 
      }}
    >
      <p className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
        {label}
      </p>
      <p
        className="tabular-nums mt-0.5 text-sm font-semibold"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}
      >
        {value}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function PayrunEmployeeDrawer({
  data,
  open,
  onClose,
  onViewPayslip,
  onDownloadPayslip,
}: PayrunEmployeeDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && data && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_PREMIUM }}
            onClick={onClose}
          />

          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={`Payrun details for ${data.overview.name}`}
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col sm:w-[480px] md:w-[540px]"
            style={{
              backgroundColor: 'var(--surface-background)',
              fontFamily: 'var(--font-body)',
              boxShadow: 'var(--drawer-shadow)',
              borderLeft: '1px solid var(--border-color)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: EASE_PREMIUM }}
          >
            {/* Sticky header */}
            <header
              className="sticky top-0 z-10 shrink-0 border-b px-6 py-5"
              style={{
                backgroundColor: 'var(--surface-background)',
                borderColor: 'var(--border-color)',
              }}
            >
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close drawer"
                className="absolute right-5 top-5 rounded-full p-1.5 transition-colors hover:bg-surface-hover"
                style={{ color: 'var(--text-muted)' }}
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-start gap-4 pr-8">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border text-sm font-semibold"
                  style={{
                    borderColor: 'var(--border-strong)',
                    backgroundColor: 'var(--surface-hover)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {data.overview.avatarUrl ? (
                    <img
                      src={data.overview.avatarUrl}
                      alt={data.overview.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    data.overview.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {data.overview.name}
                  </p>
                  <p
                    className="mt-0.5 truncate text-sm"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
                  >
                    {data.overview.employeeCode} · {data.overview.designation}
                  </p>
                  <p className="mt-0.5 truncate text-xs" style={{ color: 'var(--text-muted)' }}>
                    {data.overview.department} · {data.overview.payrollMonth}
                  </p>
                </div>

                <StampBadge status={data.overview.status} />
              </div>
            </header>

            {/* Scrollable body */}
            <div
              className="flex-1 space-y-4 overflow-y-auto px-6 py-5"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0, black 16px)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, black 16px)',
              }}
            >
              {/* Salary summary */}
              <SectionCard icon={Wallet} title="Salary Summary">
                <Row label="Annual CTC" value={formatCurrency(data.salary.annualCTC)} />
                <Row label="Monthly CTC" value={formatCurrency(data.salary.monthlyCTC)} />
                <Row label="Gross salary" value={formatCurrency(data.salary.grossSalary)} />

                <div
                  className="my-3 rounded-xl border px-4 py-3.5"
                  style={{
                    backgroundColor: 'var(--gold-soft)',
                    borderColor: 'var(--gold-border)',
                  }}
                >
                  <div className="flex items-baseline justify-between">
                    <span
                      className="text-xs font-medium uppercase tracking-wide"
                      style={{ color: 'var(--gold)' }}
                    >
                      Net salary
                    </span>
                    <span
                      className="tabular-nums text-2xl"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                    >
                      {formatCurrency(data.salary.netSalary)}
                    </span>
                  </div>
                </div>

                <Row
                  label="Payment date"
                  value={formatDate(data.salary.paymentDate)}
                  divider={false}
                  muted
                />
              </SectionCard>

              {/* Earnings */}
              <SectionCard icon={TrendingUp} title="Earnings">
                <Row label="Basic pay" value={formatCurrency(data.earnings.basic)} />
                <Row label="HRA" value={formatCurrency(data.earnings.hra)} />
                <Row label="Special allowance" value={formatCurrency(data.earnings.specialAllowance)} />
                <Row label="Bonus" value={formatCurrency(data.earnings.bonus)} />
                <Row label="Overtime" value={formatCurrency(data.earnings.overtime)} />
                <Row
                  label="Reimbursements"
                  value={formatCurrency(data.earnings.reimbursements)}
                  divider={false}
                />
              </SectionCard>

              {/* Deductions */}
              <SectionCard icon={MinusCircle} title="Deductions">
                <Row label="EPF" value={`-${formatCurrency(data.deductions.epf)}`} />
                <Row label="ESI" value={`-${formatCurrency(data.deductions.esi)}`} />
                <Row
                  label="Professional tax"
                  value={`-${formatCurrency(data.deductions.professionalTax)}`}
                />
                <Row label="Income tax (TDS)" value={`-${formatCurrency(data.deductions.incomeTax)}`} />
                <Row label="LWF" value={`-${formatCurrency(data.deductions.lwf)}`} />
                <Row
                  label="Loan / advance"
                  value={`-${formatCurrency(data.deductions.loanAdvance)}`}
                />
                <Row
                  label="Other deductions"
                  value={`-${formatCurrency(data.deductions.otherDeductions)}`}
                  divider={false}
                />
              </SectionCard>

              {/* Employer contributions */}
              <SectionCard icon={Building2} title="Employer Contributions">
                <Row label="Employer EPF" value={formatCurrency(data.employerContributions.employerEpf)} />
                <Row
                  label="Employer ESI"
                  value={formatCurrency(data.employerContributions.employerEsi)}
                  divider={false}
                />
              </SectionCard>

              {/* Attendance & leave */}
              <SectionCard icon={CalendarCheck} title="Attendance & Leave">
                <div className="flex items-center gap-4 pb-4">
                  <AttendanceRing
                    present={data.attendance.presentDays}
                    working={data.attendance.workingDays}
                  />
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {data.attendance.presentDays} of {data.attendance.workingDays} working days
                    present this cycle.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <StatTile label="Working days" value={String(data.attendance.workingDays)} />
                  <StatTile label="Present days" value={String(data.attendance.presentDays)} />
                  <StatTile label="Paid leave" value={String(data.attendance.paidLeave)} />
                  <StatTile label="Loss of pay" value={String(data.attendance.lossOfPay)} />
                </div>
              </SectionCard>
            </div>

            {/* Sticky footer */}
            <footer
              className="sticky bottom-0 z-10 flex shrink-0 items-center gap-3 border-t px-6 py-4"
              style={{
                backgroundColor: 'var(--surface-background)',
                borderColor: 'var(--border-color)',
              }}
            >
              <button
                onClick={onViewPayslip}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-colors hover:bg-surface-hover"
                style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
              >
                <FileText className="h-4 w-4" />
                View payslip
              </button>
              <button
                onClick={onDownloadPayslip}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ 
                  backgroundColor: 'var(--accent)', 
                  color: 'var(--accent-text)' 
                }}
              >
                <Download className="h-4 w-4" />
                Download PDF
              </button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}