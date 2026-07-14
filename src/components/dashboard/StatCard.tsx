import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { AnimatedCounter } from "./AnimatedCounter";
import { cn } from "@/lib/utils";
import type { StatTrend } from "@/lib/types";

interface StatCardProps {
  stat: StatTrend;
  icon: LucideIcon;
}

const MotionCard = motion.create(Card);

export function StatCard({ stat, icon: Icon }: StatCardProps) {
  const isPositive = stat.delta >= 0;

  return (
    <MotionCard
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden p-5 transition-shadow duration-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <p className="text-[13px] font-medium text-ink-secondary">
          {stat.label}
        </p>
        <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-primary-tint text-primary transition-transform duration-200 group-hover:scale-105">
          <Icon size={15.5} strokeWidth={2} />
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <p className="tabular-nums font-display text-[26px] leading-none tracking-tight text-ink">
          <AnimatedCounter value={stat.value} format={stat.format} />
        </p>

        <span
          className={cn(
            "flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11.5px] font-medium tabular-nums",
            isPositive
              ? "bg-status-success-bg text-status-success"
              : "bg-status-danger-bg text-status-danger"
          )}
        >
          {isPositive ? (
            <ArrowUpRight size={12} strokeWidth={2.5} />
          ) : (
            <ArrowDownRight size={12} strokeWidth={2.5} />
          )}
          {Math.abs(stat.delta)}%
        </span>
      </div>
    </MotionCard>
  );
}