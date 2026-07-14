import type {
  Employee,
  Payrun,
  PayrunLineItem,
  StatTrend,
  ChartPoint,
  ActivityItem,
  DepartmentStat,
  PersonalDetails,
  BankDetails,
  StatutoryDetails,
  SalaryStructure,
  EmployeeProfile,
} from "./types";

export function getEmployeeById(id: string): Employee | undefined {
  return EMPLOYEES.find((emp) => emp.id === id);
}

export const EMPLOYEES: Employee[] = [
  { id: "EMP-001", name: "Aarav Mehta", role: "Senior Frontend Engineer", department: "Engineering", email: "aarav.mehta@meridian.io", status: "active", location: "Bengaluru, IN", joinedDate: "2022-03-14", salary: 1850000 },
  { id: "EMP-002", name: "Ishita Rao", role: "Product Designer", department: "Design", email: "ishita.rao@meridian.io", status: "active", location: "Mumbai, IN", joinedDate: "2021-11-02", salary: 1620000 },
  { id: "EMP-003", name: "Kabir Singh", role: "Engineering Manager", department: "Engineering", email: "kabir.singh@meridian.io", status: "active", location: "Delhi, IN", joinedDate: "2020-06-19", salary: 2650000 },
  { id: "EMP-004", name: "Priya Nair", role: "People Operations Lead", department: "HR", email: "priya.nair@meridian.io", status: "on-leave", location: "Bengaluru, IN", joinedDate: "2021-01-25", salary: 1450000 },
  { id: "EMP-005", name: "Devansh Kapoor", role: "Backend Engineer", department: "Engineering", email: "devansh.kapoor@meridian.io", status: "active", location: "Pune, IN", joinedDate: "2023-02-10", salary: 1550000 },
  { id: "EMP-006", name: "Ananya Iyer", role: "Marketing Manager", department: "Marketing", email: "ananya.iyer@meridian.io", status: "active", location: "Mumbai, IN", joinedDate: "2022-08-01", salary: 1380000 },
  { id: "EMP-007", name: "Rohan Verma", role: "DevOps Engineer", department: "Engineering", email: "rohan.verma@meridian.io", status: "active", location: "Hyderabad, IN", joinedDate: "2021-09-13", salary: 1720000 },
  { id: "EMP-008", name: "Sanya Kapoor", role: "Finance Analyst", department: "Finance", email: "sanya.kapoor@meridian.io", status: "active", location: "Delhi, IN", joinedDate: "2023-05-22", salary: 1120000 },
  { id: "EMP-009", name: "Vivaan Joshi", role: "QA Engineer", department: "Engineering", email: "vivaan.joshi@meridian.io", status: "inactive", location: "Chennai, IN", joinedDate: "2020-12-04", salary: 980000 },
  { id: "EMP-010", name: "Myra Desai", role: "Product Manager", department: "Product", email: "myra.desai@meridian.io", status: "active", location: "Bengaluru, IN", joinedDate: "2021-04-18", salary: 2100000 },
  { id: "EMP-011", name: "Arjun Malhotra", role: "Sales Executive", department: "Sales", email: "arjun.malhotra@meridian.io", status: "active", location: "Mumbai, IN", joinedDate: "2022-10-09", salary: 1050000 },
  { id: "EMP-012", name: "Neha Chawla", role: "HR Business Partner", department: "HR", email: "neha.chawla@meridian.io", status: "active", location: "Delhi, IN", joinedDate: "2023-01-16", salary: 1280000 },
  { id: "EMP-013", name: "Karan Bhatt", role: "Data Engineer", department: "Engineering", email: "karan.bhatt@meridian.io", status: "on-leave", location: "Pune, IN", joinedDate: "2022-07-27", salary: 1680000 },
  { id: "EMP-014", name: "Diya Sharma", role: "Content Strategist", department: "Marketing", email: "diya.sharma@meridian.io", status: "active", location: "Bengaluru, IN", joinedDate: "2023-09-11", salary: 990000 },
  { id: "EMP-015", name: "Reyansh Gupta", role: "Full Stack Engineer", department: "Engineering", email: "reyansh.gupta@meridian.io", status: "active", location: "Hyderabad, IN", joinedDate: "2021-02-28", salary: 1780000 },
  { id: "EMP-016", name: "Anika Bose", role: "Customer Success Lead", department: "Support", email: "anika.bose@meridian.io", status: "active", location: "Chennai, IN", joinedDate: "2022-05-05", salary: 1180000 },
  { id: "EMP-017", name: "Yash Trivedi", role: "Security Engineer", department: "Engineering", email: "yash.trivedi@meridian.io", status: "active", location: "Delhi, IN", joinedDate: "2023-03-30", salary: 1920000 },
  { id: "EMP-018", name: "Tara Khanna", role: "Finance Manager", department: "Finance", email: "tara.khanna@meridian.io", status: "active", location: "Mumbai, IN", joinedDate: "2020-11-23", salary: 2300000 },
];




export const PAYROLL_TREND: ChartPoint[] = [
  { label: "Feb", value: 21200000 },
  { label: "Mar", value: 21800000 },
  { label: "Apr", value: 22100000 },
  { label: "May", value: 22600000 },
  { label: "Jun", value: 23400000 },
  { label: "Jul", value: 24850000 },
];

export const DEPARTMENT_BREAKDOWN: DepartmentStat[] = [
  { department: "Engineering", headcount: 78, percentOfTotal: 42 },
  { department: "Sales", headcount: 26, percentOfTotal: 14 },
  { department: "Marketing", headcount: 20, percentOfTotal: 11 },
  { department: "Design", headcount: 16, percentOfTotal: 9 },
  { department: "Finance", headcount: 15, percentOfTotal: 8 },
  { department: "HR", headcount: 13, percentOfTotal: 7 },
  { department: "Support", headcount: 18, percentOfTotal: 9 },
];

export const ACTIVITY_FEED: ActivityItem[] = [
  { id: "ACT-01", type: "payrun-processed", actor: "System", description: "July payrun processed for 186 employees", timestamp: "2026-07-14T09:12:00" },
  { id: "ACT-02", type: "employee-joined", actor: "Priya Nair", description: "Onboarded Yash Trivedi as Security Engineer", timestamp: "2026-07-13T15:40:00" },
  { id: "ACT-03", type: "leave-approved", actor: "Neha Chawla", description: "Approved leave request for Karan Bhatt", timestamp: "2026-07-12T11:05:00" },
  { id: "ACT-04", type: "employee-updated", actor: "Priya Nair", description: "Updated compensation for Tara Khanna", timestamp: "2026-07-11T17:22:00" },
  { id: "ACT-05", type: "payrun-scheduled", actor: "System", description: "August payrun scheduled for Aug 1", timestamp: "2026-07-10T08:00:00" },
];

export const PAYRUNS: Payrun[] = [
  { id: "PR-2026-07", period: "July 2026", runDate: "2026-07-01", employeesCount: 186, totalAmount: 24850000, status: "paid" },
  { id: "PR-2026-08", period: "August 2026", runDate: "2026-08-01", employeesCount: 188, totalAmount: 25100000, status: "scheduled" },
  { id: "PR-2026-06", period: "June 2026", runDate: "2026-06-01", employeesCount: 184, totalAmount: 23400000, status: "paid" },
  { id: "PR-2026-05", period: "May 2026", runDate: "2026-05-01", employeesCount: 181, totalAmount: 22600000, status: "paid" },
  { id: "PR-2026-04", period: "April 2026", runDate: "2026-04-01", employeesCount: 179, totalAmount: 22100000, status: "paid" },
  { id: "PR-2026-09", period: "September 2026", runDate: "2026-09-01", employeesCount: 188, totalAmount: 25400000, status: "processing" },
];

export function getPayrunLineItems(_payrunId: string): PayrunLineItem[] {
  // Deterministic mock line items derived from the employee list
  return EMPLOYEES.slice(0, 10).map((emp, i) => {
    const gross = Math.round(emp.salary / 12);
    const deductions = Math.round(gross * (0.12 + (i % 3) * 0.01));
    return {
      employeeId: emp.id,
      employeeName: emp.name,
      role: emp.role,
      gross,
      deductions,
      net: gross - deductions,
    };
  });
}


const PENDING_PAYRUNS = PAYRUNS.filter(
  (p) => p.status === "processing" || p.status === "scheduled"
).length;

const COMPLETED_PAYRUNS = PAYRUNS.filter((p) => p.status === "paid").length;

// export const DASHBOARD_STATS: StatTrend[] = [
//   { label: "Total Employees", value: 186, delta: 4.2, format: "number" },
//   { label: "Monthly Payroll", value: 24850000, delta: 2.8, format: "currency" },
//   { label: "Active Payruns", value: 3, delta: -1, format: "number" },
//   { label: "Attrition Rate", value: 3.4, delta: -0.6, format: "percent" },
// ];


export const DASHBOARD_STATS: StatTrend[] = [
  { label: "Total Employees", value: 186, delta: 4.2, format: "number" },
  { label: "Monthly Payroll", value: 24850000, delta: 2.8, format: "currency" },
  { label: "Active Payruns", value: 3, delta: -1, format: "number" },
  { label: "Total Company CTC", value: 298200000, delta: 3.1, format: "currency" },
  { label: "Total PF Contribution", value: 1988000, delta: 2.4, format: "currency" },
  { label: "Total ESI Contribution", value: 286500, delta: -1.6, format: "currency" },
  { label: "Pending Pay Runs", value: PENDING_PAYRUNS, delta: -1, format: "number" },
  { label: "Completed Pay Runs", value: COMPLETED_PAYRUNS, delta: 8.3, format: "number" },
];


function seedFromId(id: string): number {
  return parseInt(id.replace(/\D/g, ""), 10) || 1;
}

function generatePersonalDetails(emp: Employee): PersonalDetails {
  const seed = seedFromId(emp.id);
  const genders: PersonalDetails["gender"][] = ["male", "female", "other"];
  return {
    dateOfBirth: `19${88 + (seed % 10)}-0${1 + (seed % 9)}-${10 + (seed % 18)}`,
    gender: genders[seed % genders.length],
    maritalStatus: seed % 2 === 0 ? "married" : "single",
    phone: `+91 98${String(10000000 + seed * 137).slice(0, 8)}`,
    personalEmail: `${emp.name.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
    address: `${100 + seed}, ${emp.location.split(",")[0]} Layout, ${emp.location}`,
    emergencyContactName: "Not on file",
    emergencyContactPhone: "—",
  };
}

const BANKS = ["HDFC Bank", "ICICI Bank", "Axis Bank", "State Bank of India", "Kotak Mahindra Bank"];
const IFSC_PREFIXES = ["HDFC", "ICIC", "UTIB", "SBIN", "KKBK"];

function generateBankDetails(emp: Employee): BankDetails {
  const seed = seedFromId(emp.id);
  const bankIndex = seed % BANKS.length;
  return {
    accountHolderName: emp.name,
    accountNumber: String(100000000000 + ((seed * 9973) % 900000000000)),
    ifscCode: `${IFSC_PREFIXES[bankIndex]}0${String(1000 + seed).padStart(6, "0")}`,
    bankName: BANKS[bankIndex],
    branch: `${emp.location.split(",")[0]} Branch`,
  };
}

function generatePAN(emp: Employee, seed: number): string {
  const letters = emp.name.replace(/[^A-Za-z]/g, "").toUpperCase();
  const prefix = letters.padEnd(5, "X").slice(0, 5);
  const digits = String(1000 + ((seed * 7) % 9000));
  const suffix = String.fromCharCode(65 + (seed % 26));
  return `${prefix}${digits}${suffix}`;
}

function generateStatutoryDetails(emp: Employee): StatutoryDetails {
  const seed = seedFromId(emp.id);
  const monthlyWage = emp.salary / 12;
  const esiEligible = monthlyWage <= 21000; // real ESI wage ceiling — none qualify at these salary bands
  return {
    pan: generatePAN(emp, seed),
    uan: String(100000000000 + seed * 9091),
    pfNumber: `KA/BNG/00${seed}/000/0000${seed}`,
    pfEligible: true,
    esiNumber: esiEligible ? `31${String(seed).padStart(8, "0")}` : undefined,
    esiEligible,
  };
}

function generateSalaryStructure(emp: Employee): SalaryStructure {
  const annualCTC = emp.salary;
  const monthlyCTC = annualCTC / 12;
  const basic = Math.round(monthlyCTC * 0.5);
  const hra = Math.round(basic * 0.4);
  const pfEmployeeContribution = Math.round(basic * 0.12);
  const pfEmployerContribution = Math.round(basic * 0.12);
  const specialAllowance = Math.round(monthlyCTC - basic - hra - pfEmployerContribution);
  const grossMonthly = basic + hra + specialAllowance;
  const netMonthly = grossMonthly - pfEmployeeContribution;

  return {
    basic,
    hra,
    specialAllowance,
    pfEmployeeContribution,
    pfEmployerContribution,
    esiEmployeeContribution: 0,
    esiEmployerContribution: 0,
    grossMonthly,
    netMonthly,
    annualCTC,
  };
}

export function getEmployeeProfile(id: string): EmployeeProfile | undefined {
  const emp = EMPLOYEES.find((e) => e.id === id);
  if (!emp) return undefined;
  return {
    ...emp,
    personalDetails: generatePersonalDetails(emp),
    bankDetails: generateBankDetails(emp),
    statutoryDetails: generateStatutoryDetails(emp),
    salaryStructure: generateSalaryStructure(emp),
  };
}
