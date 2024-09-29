import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import EmployeeDetails from "./employee-detail";

const EmployeePage = async ({
  params: { employeeId },
}: {
  params: { employeeId: Id<"employees"> };
}) => {

  const employee = await fetchQuery(api.employees.getEmployee, {id: employeeId});

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return <div>
    <EmployeeDetails employee={employee} />
  </div>;
};
export default EmployeePage;
