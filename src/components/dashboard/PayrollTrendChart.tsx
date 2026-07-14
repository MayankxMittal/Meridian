import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { PAYROLL_TREND } from "@/lib/mockData";
import { formatCurrency, cn } from "@/lib/utils";

const RANGES = ["6M", "1Y"] as const;

export function PayrollTrendChart() {
  const [range, setRange] = useState<(typeof RANGES)[number]>("6M");

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div>
          <CardTitle>Payroll trend</CardTitle>
          <p className="mt-0.5 text-[12.5px] text-ink-muted">
            Total disbursed per month
          </p>
        </div>
        <div className="flex items-center gap-0.5 rounded-[8px] border border-border bg-bg p-0.5">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "rounded-[6px] px-2.5 py-1 text-[12px] font-medium transition-colors duration-150",
                range === r
                  ? "bg-surface text-ink shadow-xs"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={PAYROLL_TREND}
              margin={{ top: 8, right: 4, left: -12, bottom: 0 }}
            >
              <defs>
                <linearGradient id="payrollFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0F4C3A" stopOpacity={0.16} />
                  <stop offset="100%" stopColor="#0F4C3A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="#EEECE7"
                strokeDasharray="0"
              />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#8A8F96", fontSize: 12, fontFamily: "Inter Variable" }}
                dy={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#8A8F96", fontSize: 11, fontFamily: "JetBrains Mono" }}
                tickFormatter={(v) => `₹${(v / 10000000).toFixed(1)}Cr`}
                width={54}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#D7D4CD", strokeWidth: 1 }} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0F4C3A"
                strokeWidth={2}
                fill="url(#payrollFill)"
                activeDot={{ r: 4, fill: "#0F4C3A", strokeWidth: 2, stroke: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-[8px] border border-border bg-surface px-3 py-2 shadow-md">
      <p className="text-[11px] font-medium text-ink-muted">{label} 2026</p>
      <p className="tabular-nums text-[13.5px] font-medium text-ink">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
}