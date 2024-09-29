import { ReactNode } from "react";
import { FarmDashboard } from "./_components/dashboard-01";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <FarmDashboard>{children}</FarmDashboard>;
};
export default DashboardLayout;
