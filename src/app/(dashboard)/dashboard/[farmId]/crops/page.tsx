import { fetchQuery } from "convex/nextjs";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../convex/_generated/api";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Crop, Eye, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CropsPage = async ({params:{farmId}}:{params:{farmId:Id<"farm">}}) => {

  const crops = await fetchQuery(api.crops.getCrops, {farmId})

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl ">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Crop className="h-6 w-6" />
            Crops List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {crops.map((crop) => (
              <AccordionItem key={crop._id} value={crop._id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full">
                    <div className="">
                      <span className="font-semibold text-xl flex-col flex text-left">
                        {crop.name}
                      </span>
                      <Badge className="bg-zinc-700 text-xs text-center rounded-full capitalize">
                        {crop.variety}
                      </Badge>
                    </div>

                    <Link href={`/dashboard/${farmId}/crops/${crop._id}`}>
                      <Button variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div>
                      <h4 className="font-semibold mb-1">Description</h4>
                      <p className="text-sm text-muted-foreground">
                        {crop.description}
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Area Information
                      </h4>
                      <div className="bg-muted p-3 rounded-md">
                        <p className="font-medium">{crop.area?.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Size: {crop.area?.size} acres
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {crop.area?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};
export default CropsPage;
