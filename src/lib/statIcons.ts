import {
  Users,
  Wallet,
  Landmark,
  PiggyBank,
  HeartPulse,
  Clock,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

export const STAT_ICONS: Record<string, LucideIcon> = {
  "Total Employees": Users,
  "Monthly Payroll": Wallet,
  "Active Payruns": Landmark,
  "Total Company CTC": Landmark,
  "Total PF Contribution": PiggyBank,
  "Total ESI Contribution": HeartPulse,
  "Pending Pay Runs": Clock,
  "Completed Pay Runs": CheckCircle2,
};
