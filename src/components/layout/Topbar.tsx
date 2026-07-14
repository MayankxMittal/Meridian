import { Search, Bell, Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/lib/theme";

interface TopbarProps {
  title: string;
  subtitle?: string;
  onOpenCommandPalette: () => void;
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[8px] text-ink-secondary transition-colors duration-150 hover:bg-surface hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          {isDark ? <Moon size={16.5} strokeWidth={2} /> : <Sun size={16.5} strokeWidth={2} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Topbar({ title, subtitle, onOpenCommandPalette }: TopbarProps) {
  const isMac =
    typeof navigator !== "undefined" && /Mac/.test(navigator.platform);

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border bg-bg/80 px-8 backdrop-blur-md">
      <div>
        <h1 className="font-display text-[19px] leading-tight tracking-tight text-ink">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[12.5px] leading-tight text-ink-muted">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenCommandPalette}
          className="flex h-9 w-[220px] items-center gap-2 rounded-[8px] border border-border bg-surface px-3 text-[13px] text-ink-muted shadow-xs transition-all duration-150 hover:border-border-strong hover:shadow-sm"
        >
          <Search size={14.5} strokeWidth={2} />
          <span className="flex-1 text-left">Search…</span>
          <kbd className="rounded-[4px] border border-border bg-bg px-1.5 py-0.5 font-mono text-[10.5px] text-ink-muted">
            {isMac ? "⌘K" : "Ctrl K"}
          </kbd>
        </button>

        <ThemeToggle />

        <button className="relative flex h-9 w-9 items-center justify-center rounded-[8px] text-ink-secondary transition-colors duration-150 hover:bg-surface hover:text-ink">
          <Bell size={17} strokeWidth={2} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>
      </div>
    </header>
  );
}