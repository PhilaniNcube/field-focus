import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MapPin, ArrowLeft, Crop, Info } from "lucide-react";
import { Doc } from "../../../../../../../convex/_generated/dataModel";
import Link from "next/link";

interface Crop {
  id: string;
  name: string;
  plantedArea: number;
  plantingDate: string;
  expectedHarvestDate: string;
}

interface FarmArea {
  id: string;
  name: string;
  size: number;
  description: string;
  crops: Crop[];
}

// Mock data for a single farm area
const mockFarmArea: FarmArea = {
  id: "1",
  name: "North Field",
  size: 50,
  description:
    "Primary crop production area with advanced irrigation system. This area is known for its rich soil and optimal sunlight exposure, making it ideal for a variety of crops.",
  crops: [
    {
      id: "1",
      name: "Corn",
      plantedArea: 30,
      plantingDate: "2023-04-15",
      expectedHarvestDate: "2023-09-30",
    },
    {
      id: "2",
      name: "Soybeans",
      plantedArea: 15,
      plantingDate: "2023-05-01",
      expectedHarvestDate: "2023-10-15",
    },
    {
      id: "3",
      name: "Wheat",
      plantedArea: 5,
      plantingDate: "2023-03-01",
      expectedHarvestDate: "2023-07-15",
    },
  ],
};

export default function FarmAreaDetails({ area }: { area: Doc<"farm_areas"> }) {
  return (
    <div className="container mx-auto p-4">
      <Link href={`/dashboard/${area.farm_id}/farm-areas`} prefetch={false}>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Farm Areas
        </Button>
      </Link>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <MapPin className="h-6 w-6" />
            Farm Area Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{area.name}</h2>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {area.size} hectares
              </Badge>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Info className="h-5 w-5" />
                Description
              </h3>
              <p className="text-muted-foreground">
                {area.description}
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Crop className="h-5 w-5" />
                Linked Crops
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Crop Name</TableHead>
                      <TableHead>Planted Area</TableHead>
                      <TableHead>Planting Date</TableHead>
                      <TableHead>Expected Harvest</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockFarmArea.crops.map((crop) => (
                      <TableRow key={crop.id}>
                        <TableCell className="font-medium">
                          {crop.name}
                        </TableCell>
                        <TableCell>{crop.plantedArea} acres</TableCell>
                        <TableCell>{crop.plantingDate}</TableCell>
                        <TableCell>{crop.expectedHarvestDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
