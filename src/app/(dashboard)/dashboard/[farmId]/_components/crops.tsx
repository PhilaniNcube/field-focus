import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doc } from "../../../../../../convex/_generated/dataModel";

const CropsList = ({ crops }: { crops: Doc<"crops">[] }) => {

  console.log(crops);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-slate-800">Crops</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {crops.map((crop) => (
            <li className="border-b-2" key={crop._id}>
              {crop.name}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
export default CropsList;
