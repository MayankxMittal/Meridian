import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useInView } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  format?: "currency" | "number" | "percent";
  className?: string;
}

export function AnimatedCounter({
  value,
  format = "number",
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 90, damping: 24 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (!ref.current) return;
      ref.current.textContent = formatValue(latest, format);
    });
  }, [spring, format]);

  return (
    <span ref={ref} className={className}>
      {formatValue(0, format)}
    </span>
  );
}

function formatValue(v: number, format: "currency" | "number" | "percent") {
  if (format === "currency") return formatCurrency(Math.round(v));
  if (format === "percent") return `${v.toFixed(1)}%`;
  return Math.round(v).toLocaleString("en-IN");
}