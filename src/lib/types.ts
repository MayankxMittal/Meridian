
export interface Employee {
  id: string;
  name: string;
  avatarUrl?: string;
  role: string;
  department: string;
  email: string;
  status: EmployeeStatus;
  location: string;
  joinedDate: string;
  salary: number;
}


export interface Payrun {
  id: string;
  period: string;
  runDate: string;
  employeesCount: number;
  totalAmount: number;
  status: PayrunStatus;
}

export interface PayrunLineItem {
  employeeId: string;
  employeeName: string;
  role: string;
  gross: number;
  deductions: number;
  net: number;
}

export interface StatTrend {
  label: string;
  value: number;
  delta: number;
  format: "currency" | "number" | "percent";
}

export interface ChartPoint {
  label: string;
  value: number;
  secondary?: number;
}


export interface ActivityItem {
  id: string;
  type: ActivityType;
  actor: string;
  description: string;
  timestamp: string;
}

export interface DepartmentStat {
  department: string;
  headcount: number;
  percentOfTotal: number;
}

export interface Payrun {
  id: string;
  period: string;
  runDate: string;
  employeesCount: number;
  totalAmount: number;
  status: PayrunStatus;
}

export interface PayrunLineItem {
  employeeId: string;
  employeeName: string;
  role: string;
  gross: number;
  deductions: number;
  net: number;
}


export interface PersonalDetails {
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  maritalStatus: "single" | "married" | "other";
  phone: string;
  personalEmail: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branch: string;
}

export interface StatutoryDetails {
  pan: string;
  uan: string;
  pfNumber: string;
  pfEligible: boolean;
  esiNumber?: string;
  esiEligible: boolean;
}

export interface SalaryStructure {
  basic: number;
  hra: number;
  specialAllowance: number;
  pfEmployeeContribution: number;
  pfEmployerContribution: number;
  esiEmployeeContribution: number;
  esiEmployerContribution: number;
  grossMonthly: number;
  netMonthly: number;
  annualCTC: number;
}

export interface EmployeeProfile extends Employee {
  personalDetails: PersonalDetails;
  bankDetails: BankDetails;
  statutoryDetails: StatutoryDetails;
  salaryStructure: SalaryStructure;
}

export type EmployeeStatus = "active" | "on-leave" | "inactive";

export interface Employee {
  id: string;
  name: string;
  avatarUrl?: string;
  role: string;
  department: string;
  email: string;
  status: EmployeeStatus;
  location: string;
  joinedDate: string;
  salary: number;
}

export type PayrunStatus = "paid" | "processing" | "scheduled" | "failed";

export interface Payrun {
  id: string;
  period: string;
  runDate: string;
  employeesCount: number;
  totalAmount: number;
  status: PayrunStatus;
}

export interface PayrunLineItem {
  employeeId: string;
  employeeName: string;
  role: string;
  gross: number;
  deductions: number;
  net: number;
}

export interface StatTrend {
  label: string;
  value: number;
  delta: number;
  format: "currency" | "number" | "percent";
}

export interface ChartPoint {
  label: string;
  value: number;
  secondary?: number;
}

export type ActivityType =
  | "payrun-processed"
  | "employee-joined"
  | "leave-approved"
  | "employee-updated"
  | "payrun-scheduled";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  actor: string;
  description: string;
  timestamp: string;
}

export interface DepartmentStat {
  department: string;
  headcount: number;
  percentOfTotal: number;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  headCount: number;
  createdAt: string;
}