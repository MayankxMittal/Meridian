import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Card, CardTitle, CardContent } from '@/components/ui/Card';
import { PayrunStatusBadge } from './PayrunStatusBadge';
import { EmptyState } from '@/components/employees/EmptyState';
import { PAYRUNS, getPayrunLineItems } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { PayrunEmployeeDrawer, type PayrunEmployeeDrawerData } from './PayrunEmployeeDrawer';
import { PayrunSummary, type PayrunSummaryData } from './PayrunSummary';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import type { Payrun, PayrunLineItem } from '@/lib/types';

const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];

function getDrawerData(item: PayrunLineItem, payrun: Payrun): PayrunEmployeeDrawerData {
  const basic = Math.round(item.gross * 0.5);
  const hra = Math.round(item.gross * 0.25);
  const epf = Math.round(item.deductions * 0.6);
  const incomeTax = Math.round(item.deductions * 0.35);

  return {
    overview: {
      name: item.employeeName,
      employeeCode: item.employeeId,
      department: '—',
      designation: item.role,
      payrollMonth: payrun.period,
      status: payrun.status === 'paid' ? 'paid' : 'pending',
    },
    salary: {
      annualCTC: item.gross * 12,
      monthlyCTC: item.gross,
      grossSalary: item.gross,
      netSalary: item.net,
      paymentDate: payrun.runDate,
    },
    earnings: {
      basic,
      hra,
      specialAllowance: item.gross - basic - hra,
      bonus: 0,
      overtime: 0,
      reimbursements: 0,
    },
    deductions: {
      epf,
      esi: 0,
      professionalTax: item.deductions - epf - incomeTax,
      incomeTax,
      lwf: 0,
      loanAdvance: 0,
      otherDeductions: 0,
    },
    employerContributions: { employerEpf: epf, employerEsi: 0 },
    attendance: { workingDays: 22, presentDays: 22, paidLeave: 0, lossOfPay: 0 },
  };
}

export function PayrunDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<PayrunEmployeeDrawerData | null>(null);
  const [isLineItemsOpen, setIsLineItemsOpen] = useState(true);



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

  const summary: PayrunSummaryData = {
    totalEmployees: payrun.employeesCount,
    totalPayrollCost: payrun.totalAmount,
    totalNetSalaryPaid: lineItems.reduce((sum, item) => sum + item.net, 0),
    totalDeductions: lineItems.reduce((sum, item) => sum + item.deductions, 0),
    totalEmployerContribution: Math.round(
      lineItems.reduce((sum, item) => sum + item.deductions, 0) * 0.6,
    ),
    averageSalary: payrun.totalAmount / payrun.employeesCount,
    distribution: (() => {
      const totalNetSalary = lineItems.reduce((sum, item) => sum + item.net, 0);
      const totalDeductions = lineItems.reduce((sum, item) => sum + item.deductions, 0);
      const epf = Math.round(totalDeductions * 0.6);
      const incomeTax = Math.round(totalDeductions * 0.35);

      return [
        { label: 'Net Salary', amount: totalNetSalary },
        { label: 'EPF', amount: epf },
        { label: 'ESI', amount: 0 },
        { label: 'Income Tax (TDS)', amount: incomeTax },
        { label: 'Other Deductions', amount: totalDeductions - epf - incomeTax },
      ];
    })(),
    paymentStatus: {
      paid: payrun.status === 'paid' ? payrun.employeesCount : 0,
      pending: payrun.status === 'paid' ? 0 : payrun.employeesCount,
      onHold: 0,
      failed: 0,
    },
  };

  return (
    <div className="space-y-6">
      <PayrunEmployeeDrawer
        data={selected}
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
      />



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

      <PayrunSummary
        data={summary}
        onGeneratePayroll={() => {/* regenerate */ }}
        onDownloadPayslips={() => {/* bulk download */ }}
        onExportReport={(format) => { void format; }}
      />

    <Card>
  <button
    onClick={() => setIsLineItemsOpen((prev) => !prev)}
    className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-primary-tint/20"
  >
    <div className="flex items-center gap-3">
      <CardTitle>Line items</CardTitle>
      <span className="tabular-nums rounded-full bg-primary-tint/40 px-2.5 py-0.5 font-mono text-xs font-medium text-ink-secondary">
        {lineItems.length}
      </span>
    </div>
    <motion.div
      animate={{ rotate: isLineItemsOpen ? 180 : 0 }}
      transition={{ duration: 0.3, ease: EASE_PREMIUM }}
    >
      <ChevronDown className="h-4 w-4 text-ink-secondary" />
    </motion.div>
  </button>

  <AnimatePresence initial={false}>
    {isLineItemsOpen && (
      <motion.div
        key="line-items-content"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE_PREMIUM }}
        className="overflow-hidden"
      >
        <CardContent className="border-t border-divider p-0">
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
                    onClick={() => setSelected(getDrawerData(item, payrun))}
                    className="cursor-pointer border-b border-divider last:border-0 hover:bg-primary-tint/30"
                  >
                    <td className="px-6 py-3.5 font-medium text-ink">{item.employeeName}</td>
                    <td className="px-6 py-3.5 text-ink-secondary">{item.role}</td>
                    <td className="tabular-nums px-6 py-3.5 text-right font-mono text-ink-secondary">
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
      </motion.div>
    )}
  </AnimatePresence>
</Card>

      
    </div>
  );
}
