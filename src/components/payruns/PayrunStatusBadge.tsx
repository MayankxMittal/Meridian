import { cn } from '@/lib/utils';
import type { PayrunStatus } from '@/lib/types';

interface PayrunStatusBadgeProps {
  status: PayrunStatus;
}

const STATUS_CONFIG: Record<PayrunStatus, { label: string; tone: 'success' | 'warning' | 'neutral' | 'danger' }> = {
  paid: { label: 'Paid', tone: 'success' },
  processing: { label: 'Processing', tone: 'warning' },
  scheduled: { label: 'Scheduled', tone: 'neutral' },
  failed: { label: 'Failed', tone: 'danger' },
};

const TONE_CLASSES: Record<string, string> = {
  success: 'bg-status-success-bg text-status-success',
  warning: 'bg-status-warning-bg text-status-warning',
  neutral: 'bg-status-neutral-bg text-status-neutral',
  danger: 'bg-status-danger-bg text-status-danger',
};

const DOT_CLASSES: Record<string, string> = {
  success: 'bg-status-success',
  warning: 'bg-status-warning',
  neutral: 'bg-status-neutral',
  danger: 'bg-status-danger',
};

export function PayrunStatusBadge({ status }: PayrunStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium',
        TONE_CLASSES[config.tone]
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', DOT_CLASSES[config.tone])} />
      {config.label}
    </span>
  );
}