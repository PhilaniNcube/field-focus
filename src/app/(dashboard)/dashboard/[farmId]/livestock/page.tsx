import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddLivestock from "../../_components/add-livestock";

const LivestockPage =  async ({params:{farmId}}:{params:{farmId:Id<"farm">}}) => {

  const livestock = await fetchQuery(api.livestock.getLivestock, { farmId: farmId });

  if(!livestock){
    return null;
  }

  return (
    <div className="px-4 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
      <h1 className="text-3xl font-bold mb-8 text-center">Farm Livestock</h1>
      <AddLivestock farmId={farmId} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6">
        {livestock?.map((animal, index) => (
          <div
            key={animal._id}
          >
            <Card>
              <CardHeader>
                <CardTitle>{animal.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {animal.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">
                    Quantity:
                  </span>
                  <span className="text-lg font-bold">{animal.quantity}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LivestockPage;
