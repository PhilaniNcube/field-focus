import { fetchQuery } from "convex/nextjs";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../convex/_generated/api";
import FarmAreasCard from "../_components/farm-areas";

const FarmAreasPage = async ({params:{farmId}}:{params:{farmId:Id<"farm">}}) => {

  const farmAreas = await fetchQuery(api.farmAreas.getFarmAreas, {farmId});

  return <div>
    <FarmAreasCard farmAreas={farmAreas} />
  </div>;
};
export default FarmAreasPage;
