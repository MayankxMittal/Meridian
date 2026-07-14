import { useEffect, useState } from 'react';
import { PayrunList } from '@/components/payruns/PayrunList';
import { PAYRUNS } from '@/lib/mockData';

export function PayrunsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink-900">Payruns</h1>
        <p className="mt-1 text-sm text-neutral-500">Review past and upcoming payroll runs.</p>
      </div>
      <PayrunList payruns={PAYRUNS} loading={loading} />
    </div>
  );
}