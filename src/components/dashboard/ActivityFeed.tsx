import { motion } from "framer-motion";
import {
  Wallet,
  UserPlus,
  CalendarCheck,
  PencilLine,
  CalendarClock,
  type LucideIcon,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ACTIVITY_FEED } from "@/lib/mockData";
import type { ActivityType } from "@/lib/types";

const ACTIVITY_ICON: Record<ActivityType, LucideIcon> = {
  "payrun-processed": Wallet,
  "employee-joined": UserPlus,
  "leave-approved": CalendarCheck,
  "employee-updated": PencilLine,
  "payrun-scheduled": CalendarClock,
};

function timeAgo(timestamp: string) {
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const hours = Math.floor(diffMs / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// Recent Activity : 
// New Employee Added
// Employee Updated
// Payroll Generated
// Payroll Approved
// Employee Deleted



export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <ul className="flex flex-col">
          {ACTIVITY_FEED.map((item, i) => {
            const Icon = ACTIVITY_ICON[item.type];
            const isLast = i === ACTIVITY_FEED.length - 1;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className="relative flex gap-3 pb-4 last:pb-0"
              >
                {!isLast && (
                  <span className="absolute left-[13px] top-7 h-full w-px bg-divider" />
                )}
                <div className="z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary">
                  <Icon size={13.5} strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-[13px] leading-snug text-ink">
                    {item.description}
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-ink-muted">
                    {item.actor} · {timeAgo(item.timestamp)}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}