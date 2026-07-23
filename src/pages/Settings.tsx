import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Hash } from "lucide-react";
import { DepartmentsModule } from "@/components/settings/DepartmentsModule";
import { GLCodeModule } from "@/components/settings/GLCodeModule";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "departments", label: "Departments", icon: Building2 },
  { id: "gl-codes", label: "GL Codes", icon: Hash },
] as const;

type TabId = (typeof TABS)[number]["id"];

function Settings() {
  const [activeTab, setActiveTab] = useState<TabId>("departments");

  return (
    <div className="flex flex-col gap-5">
      {/* Tab switcher */}
      <div className="flex items-center gap-1 border-b border-border">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex items-center gap-1.5 px-3.5 py-2.5 text-[13.5px] font-medium transition-colors duration-150"
            >
              <tab.icon
                size={14.5}
                className={cn(isActive ? "text-primary" : "text-ink-muted")}
              />
              <span className={cn(isActive ? "text-ink" : "text-ink-muted")}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="settings-tab-underline"
                  className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active module */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {activeTab === "departments" ? <DepartmentsModule /> : <GLCodeModule />}
      </motion.div>
    </div>
  );
}

export default Settings;

