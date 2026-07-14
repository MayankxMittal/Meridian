import { Users } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { PayrollTrendChart } from "@/components/dashboard/PayrollTrendChart";
import { DepartmentBreakdown } from "@/components/dashboard/DepartmentBreakdown";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { DASHBOARD_STATS } from "@/lib/mockData";
import { STAT_ICONS } from "@/lib/statIcons";

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        {/* {DASHBOARD_STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} icon={STAT_ICONS[i]} />
        ))} */}
        {DASHBOARD_STATS.map((stat) => (
          <StatCard
            key={stat.label}
            stat={stat}
            icon={STAT_ICONS[stat.label] ?? Users}
          />
        ))}
      </div>

      {/* Chart + department breakdown */}
      <div className="grid grid-cols-3 gap-4">
        <PayrollTrendChart />
        <DepartmentBreakdown />
      </div>

      {/* Activity feed */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
