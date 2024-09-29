import { fetchQuery } from "convex/nextjs";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import FarmAreaDetails from "./farm-area-details";
import { api } from "../../../../../../../convex/_generated/api";

const FarmArea = async ({params:{areaId}}:{params:{areaId: Id<"farm_areas">}}) => {

  const farmArea = await fetchQuery(api.farmAreas.getFarmArea, {
    areaId: areaId,
  });

  if (!farmArea) {
    return <div>Farm area not found</div>;
  }

  return <div>
    <FarmAreaDetails area={farmArea} />
  </div>;
};
export default FarmArea;
