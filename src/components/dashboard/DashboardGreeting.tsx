import { motion } from "framer-motion";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const SUBTITLES = [
  "Have a productive day.",
  "Here's what's happening with your team today.",
  "Everything's on track — have a great one.",
];

interface DashboardGreetingProps {
  name: string;
}

export function DashboardGreeting({ name }: DashboardGreetingProps) {
  const greeting = getGreeting();
  // Deterministic pick so it doesn't shuffle on every re-render
  const subtitle = SUBTITLES[new Date().getDate() % SUBTITLES.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <h1 className="font-display text-[30px] leading-tight tracking-tight text-ink">
        {greeting}, <span className="font-display-italic">{name}.</span>
      </h1>
      <p className="mt-1.5 text-[13.5px] text-ink-muted">{subtitle}</p>
    </motion.div>
  );
}