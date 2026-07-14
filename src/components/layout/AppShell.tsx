import { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getEmployeeById } from "@/lib/mockData";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { CommandPalette } from "./CommandPalette";

const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  "/": {
    title: "Dashboard",
    subtitle: "Overview of your organization",
  },
  "/employees": {
    title: "Employees",
    subtitle: "Manage your team members",
  },
  "/payruns": {
    title: "Payruns",
    subtitle: "Track and process payroll",
  },
};

export function AppShell() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const location = useLocation();

  const meta = useMemo(() => {
    const employeeMatch = location.pathname.match(/^\/employees\/([^/]+)$/);
    if (employeeMatch) {
      const employee = getEmployeeById(employeeMatch[1]);
      if (employee) {
        return { title: employee.name, subtitle: employee.role };
      }
    }

    return (
      PAGE_META[location.pathname] ?? {
        title: "Details",
        subtitle: "",
      }
    );
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title={meta.title}
          subtitle={meta.subtitle}
          onOpenCommandPalette={() => setPaletteOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="px-8 py-7"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}