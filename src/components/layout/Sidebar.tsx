import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, Wallet, ChevronsUpDown, Settings } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/employees", label: "Employees", icon: Users, end: false },
  { to: "/payruns", label: "Payruns", icon: Wallet, end: false },
  { to: "/settings", label: "Settings", icon: Settings, end: false },
] as const;

export function Sidebar() {
  return (
    <aside className="flex h-screen w-[248px] shrink-0 flex-col border-r border-border bg-surface">
      {/* Brand */}
      <div className="flex h-16 items-center gap-2.5 px-5">
        {/* <div className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-primary">
          <div className="h-2.5 w-2.5 rounded-[2px] bg-white/90" />
        </div>
        <span className="font-display text-[17px] tracking-tight text-ink">
          Meridian
        </span> */}
        {/* <img src="/logo.png" alt="Meridian" className="" /> */}
        <img src="https://interloop.in/wp-content/uploads/2024/08/Logo-NB-With-BLUE-ORANGE-scaled-e1746509254448.png" alt="Meridian" className="w-46" />

      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pt-7">
        <ul className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.end}>
                {({ isActive }) => (
                  <div className="relative">
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-pill"
                        className="absolute inset-0 rounded-[9px] bg-primary-tint"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 38,
                        }}
                      />
                    )}
                    <div
                      className={cn(
                        "relative flex items-center gap-2.5 rounded-[9px] px-3 py-2 text-[13.5px] font-medium transition-colors duration-150",
                        isActive
                          ? "text-primary-dark"
                          : "text-ink-secondary hover:text-ink"
                      )}
                    >
                      <item.icon
                        size={16.5}
                        strokeWidth={2}
                        className={cn(
                          "shrink-0 transition-colors duration-150",
                          isActive ? "text-primary" : "text-ink-muted"
                        )}
                      />
                      {item.label}
                    </div>
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User card */}
      <div className="border-t border-border p-3">
        <button className="group flex w-full items-center gap-2.5 rounded-[9px] px-2.5 py-2 text-left transition-colors duration-150 hover:bg-bg">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-dark text-[11px] font-medium text-white">
            {getInitials("Mayank Sharma")}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium leading-tight text-ink">
              Mayank Sharma
            </p>
            <p className="truncate text-[11.5px] leading-tight text-ink-muted">
              Admin
            </p>
          </div>
          <ChevronsUpDown
            size={14}
            className="shrink-0 text-ink-muted opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          />
        </button>
      </div>
    </aside>
  );
}
