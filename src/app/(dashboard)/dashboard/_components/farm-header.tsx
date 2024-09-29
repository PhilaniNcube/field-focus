import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, MapPin } from "lucide-react";

const FarmHeader = ({name, location, size}:{name:string, location:string, size:number}) => {
  return (
    <Card className="mb-6 bg-primary/10">
      <CardHeader className=" overflow-hidden">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Leaf className="h-8 w-8" />
              {name}
            </CardTitle>
            <CardDescription className="text-lg flex items-center gap-1 mt-2">
              <MapPin className="h-5 w-5" />
              {location}
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-lg font-thin px-3 py-1">
           Size: {size} hectares
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
};
export default FarmHeader;
