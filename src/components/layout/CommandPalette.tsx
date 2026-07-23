import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, Users, Wallet, Search, Settings } from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PAGES = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Employees", to: "/employees", icon: Users },
  { label: "Payruns", to: "/payruns", icon: Wallet },
  { label: "Settings", to: "/settings", icon: Settings },
];

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") onOpenChange(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-ink/25 backdrop-blur-[2px]"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -4 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-[18%] z-50 w-full max-w-[560px] -translate-x-1/2 px-4"
          >
            <Command
              className="overflow-hidden rounded-[14px] border border-border bg-surface shadow-lg"
              shouldFilter={true}
            >
              <div className="flex items-center gap-2.5 border-b border-border px-4">
                <Search size={16} className="text-ink-muted" />
                <Command.Input
                  autoFocus
                  placeholder="Search pages, employees, payruns…"
                  className="h-12 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-muted"
                />
                <kbd className="rounded-[4px] border border-border px-1.5 py-0.5 font-mono text-[10.5px] text-ink-muted">
                  esc
                </kbd>
              </div>
              <Command.List className="max-h-[320px] overflow-y-auto p-2">
                <Command.Empty className="px-3 py-6 text-center text-[13px] text-ink-muted">
                  No results found.
                </Command.Empty>
                <Command.Group
                  heading="Pages"
                  className="px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-ink-muted [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:pb-1.5"
                >
                  {PAGES.map((page) => (
                    <Command.Item
                      key={page.to}
                      onSelect={() => {
                        navigate(page.to);
                        onOpenChange(false);
                      }}
                      className="flex cursor-pointer items-center gap-2.5 rounded-[8px] px-3 py-2.5 text-[13.5px] text-ink data-[selected=true]:bg-primary-tint data-[selected=true]:text-primary-dark"
                    >
                      <page.icon size={15.5} strokeWidth={2} />
                      {page.label}
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}