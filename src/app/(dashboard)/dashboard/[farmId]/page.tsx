import { fetchQuery } from "convex/nextjs";
import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";
import FarmHeader from "../_components/farm-header";
import AddFarmAreaModal from "../_components/add-farm-area-modal";
import AddEmployeeModal from "../_components/add-employee-modal";
import AddCropModal from "../_components/add-crop";
import CropsList from "./_components/crops";
import FarmAreasCard from "./_components/farm-areas";
import EmployeesCard from "./_components/employees-card";
import AddLivestock from "../_components/add-livestock";

const page = async ({
  params: { farmId },
}: {
  params: { farmId: Id<"farm"> };
}) => {



  const farmData =  fetchQuery(api.farm.getFarm, { farmId: farmId });
  const farmAreasData =  fetchQuery(api.farmAreas.getFarmAreas, { farmId: farmId });


 const [farm, farmAreas ] = await Promise.all([farmData, farmAreasData]);

if (!farm || !farmAreas) {
  return null;
}

  return (
    <div className="">
      <FarmHeader name={farm.name} location={farm.location} size={farm.size} />
      <div className="flex md:gap-x-3 md:flex-row flex-col gap-y-2">
        <AddFarmAreaModal farmId={farmId} />
        <AddEmployeeModal farmId={farmId} />
        <AddCropModal farmId={farmId} areas={farmAreas} />
        <AddLivestock farmId={farmId} />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <FarmAreasCard farmAreas={farmAreas} />
        <EmployeesCard farmId={farmId} />
        <CropsList farmId={farmId} />
      </div>
    </div>
  );
};
export default page;
