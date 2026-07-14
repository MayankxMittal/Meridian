import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Mail, MapPin, Building2, Calendar, BadgeIndianRupee,
  Phone, Cake, Users, Home, Landmark, ShieldCheck, Wallet,
  type LucideIcon,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { EmployeeAvatar } from "./Avatar";
import { StatusBadge } from "./StatusBadge";
import { EmptyState } from "./EmptyState";
import { getEmployeeProfile } from "@/lib/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";

const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface DetailItem {
  label: string;
  value: string;
  icon?: LucideIcon;
}

function DetailGrid({ items }: { items: DetailItem[] }) {
  return (
    <dl className="grid gap-5 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="space-y-1">
          <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-ink-muted">
            {item.icon && <item.icon size={12} />}
            {item.label}
          </dt>
          <dd className="text-[13px] font-medium text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function EmployeeProfile() {
  const { empid } = useParams<{ empid: string }>();
  const navigate = useNavigate();

  const profile = empid ? getEmployeeProfile(empid) : undefined;

  if (!profile) {
    return (
      <EmptyState
        title="Employee not found"
        description="This employee may have been removed or the link is incorrect."
      />
    );
  }

  const { personalDetails, bankDetails, statutoryDetails, salaryStructure } = profile;

  const basicInfo: DetailItem[] = [
    { label: "Employee ID", value: profile.id },
    { label: "Email", value: profile.email, icon: Mail },
    { label: "Department", value: profile.department, icon: Building2 },
    { label: "Location", value: profile.location, icon: MapPin },
    { label: "Joined", value: formatDate(profile.joinedDate), icon: Calendar },
    { label: "Annual salary", value: formatCurrency(profile.salary), icon: BadgeIndianRupee },
  ];

  const personalInfo: DetailItem[] = [
    { label: "Date of birth", value: formatDate(personalDetails.dateOfBirth), icon: Cake },
    { label: "Gender", value: personalDetails.gender },
    { label: "Marital status", value: personalDetails.maritalStatus, icon: Users },
    { label: "Phone", value: personalDetails.phone, icon: Phone },
    { label: "Personal email", value: personalDetails.personalEmail, icon: Mail },
    { label: "Address", value: personalDetails.address, icon: Home },
  ];

  const bankInfo: DetailItem[] = [
    { label: "Account holder", value: bankDetails.accountHolderName },
    { label: "Account number", value: `•••• •••• ${bankDetails.accountNumber.slice(-4)}` },
    { label: "IFSC code", value: bankDetails.ifscCode },
    { label: "Bank", value: bankDetails.bankName },
    { label: "Branch", value: bankDetails.branch },
  ];

  const statutoryInfo: DetailItem[] = [
    { label: "PAN", value: statutoryDetails.pan },
    { label: "UAN", value: statutoryDetails.uan },
    { label: "PF number", value: statutoryDetails.pfNumber },
    {
      label: "ESI number",
      value: statutoryDetails.esiEligible ? statutoryDetails.esiNumber! : "Not applicable",
    },
  ];

  const salaryInfo: DetailItem[] = [
    { label: "Basic (monthly)", value: formatCurrency(salaryStructure.basic) },
    { label: "HRA (monthly)", value: formatCurrency(salaryStructure.hra) },
    { label: "Special allowance", value: formatCurrency(salaryStructure.specialAllowance) },
    { label: "Gross monthly", value: formatCurrency(salaryStructure.grossMonthly) },
    { label: "PF (employee share)", value: `- ${formatCurrency(salaryStructure.pfEmployeeContribution)}` },
    { label: "Net monthly", value: formatCurrency(salaryStructure.netMonthly) },
    { label: "Annual CTC", value: formatCurrency(salaryStructure.annualCTC) },
  ];

  const sections: { title: string; icon: LucideIcon; items: DetailItem[] }[] = [
    { title: "Personal Details", icon: Users, items: personalInfo },
    { title: "Bank Details", icon: Landmark, items: bankInfo },
    { title: "Statutory Details", icon: ShieldCheck, items: statutoryInfo },
    { title: "Salary Structure", icon: Wallet, items: salaryInfo },
  ];

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/employees")}
        className="inline-flex items-center gap-1.5 text-sm text-ink-secondary transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to employees
      </button>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE_PREMIUM }}
      >
        <Card>
          <CardContent className="flex flex-wrap items-center gap-5 py-6">
            <EmployeeAvatar name={profile.name} size="md" className="h-14 w-14 text-base" />
            <div className="min-w-0 flex-1">
              <p className="font-display text-2xl text-ink">{profile.name}</p>
              <p className="mt-1 text-sm text-ink-secondary">{profile.role}</p>
            </div>
            <StatusBadge status={profile.status} />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05, ease: EASE_PREMIUM }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <DetailGrid items={basicInfo} />
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 + index * 0.05, ease: EASE_PREMIUM }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <section.icon size={15} className="text-primary" />
                  <CardTitle>{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <DetailGrid items={section.items} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}