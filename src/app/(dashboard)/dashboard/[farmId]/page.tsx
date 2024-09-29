import { fetchQuery } from "convex/nextjs";
import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";
import FarmHeader from "../_components/farm-header";
import AddFarmAreaModal from "../_components/add-farm-area-modal";
import AddEmployeeModal from "../_components/add-employee-modal";
import AddCropModal from "../_components/add-crop";
import CropsList from "./_components/crops";

const page = async ({
  params: { farmId },
}: {
  params: { farmId: Id<"farm"> };
}) => {

  const farm = await fetchQuery(api.farm.getFarm, { farmId: farmId });
  const farmAreas = await fetchQuery(api.farmAreas.getFarmAreas, { farmId: farmId });
  const crops = await fetchQuery(api.crops.getCrops, { farmId: farmId });

  if (!farm) {
    return null;
  }

  return (
    <div className="">
      <FarmHeader name={farm.name} location={farm.location} size={farm.size} />
      <div className="flex gap-x-3">
        <AddFarmAreaModal farmId={farmId} />
        <AddEmployeeModal farmId={farmId} />
        <AddCropModal farmId={farmId} areas={farmAreas} />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <CropsList crops={crops} />
      </div>
    </div>
  );
};
export default page;
