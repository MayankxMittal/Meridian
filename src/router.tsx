import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { DashboardPage } from "@/pages/DashboardPage";
import { EmployeesPage } from "@/pages/EmployeesPage";
import { PayrunsPage } from "@/pages/PayrunsPage";
import { PayrunDetail } from "@/components/payruns/PayrunDetail";
import { EmployeeProfile } from "@/components/employees/EmployeeProfile";
import Settings from "./pages/Settings";
// ...

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "employees", element: <EmployeesPage /> },
      { path: "employees/:empid", element: <EmployeeProfile /> },
      { path: "payruns", element: <PayrunsPage /> },
      { path: "/payruns/:id", element: <PayrunDetail /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);
