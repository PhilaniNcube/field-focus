import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doc } from "../../../../../../convex/_generated/dataModel";
import Link from "next/link";

const CropsList = ({ crops }: { crops: Doc<"crops">[] }) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-slate-800">Crops</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-y-2">
          {crops.map((crop) => (
            <Link href={`/dashboard/${crop.farm_id}/crops/${crop._id}`} className="bg-zinc-200 p-2 rounded hover:cursor-pointer hover:bg-zinc-100" key={crop._id}>
              {crop.name}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default CropsList;
