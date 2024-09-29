import { fetchQuery } from "convex/nextjs";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../convex/_generated/api";
import AddEmployeeModal from "../../_components/add-employee-modal";
import EmployeesTable from "./employees-table";

const EmployeesPage = async ({
  params: { farmId },
}: {
  params: { farmId: Id<"farm"> };
}) => {
  const employees = await fetchQuery(api.employees.getEmployees, {
    farm_id: farmId,
  });

  return (
    <div>
      <div>
        <AddEmployeeModal farmId={farmId} />
      </div>
      <EmployeesTable employees={employees} />
    </div>
  );
};
export default EmployeesPage;
