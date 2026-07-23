import { motion } from "framer-motion";
import { Hash, Sparkles } from "lucide-react";

export function GLCodeModule() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border py-24">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary-tint"
      >
        <Hash size={22} strokeWidth={1.75} className="text-primary" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-surface shadow-sm"
        >
          <Sparkles size={11} className="text-primary" />
        </motion.div>
      </motion.div>

      <div className="text-center">
        <p className="font-display text-[17px] tracking-tight text-ink">
          GL Codes — coming soon
        </p>
        <p className="mx-auto mt-1.5 max-w-[320px] text-[13px] leading-relaxed text-ink-muted">
          General ledger code mapping for departments and payroll categories
          is on its way. You'll be able to manage GL codes here shortly.
        </p>
      </div>
    </div>
  );
}