import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin } from "lucide-react";
import { Doc } from "../../../../../../convex/_generated/dataModel";
import Link from "next/link";

export default function FarmAreasCard({
  farmAreas,
}: {
  farmAreas: Doc<"farm_areas">[];
}) {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <MapPin className="h-6 w-6" />
          Farm Areas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {farmAreas.map((area, index) => (
            <Link
              href={`/dashboard/${area.farm_id}/farm-areas/${area._id}`}
              key={area._id}
              prefetch={false}
              className="hover:bg-slate-100 cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 py-2 ">
                <h3 className="text-lg font-semibold">{area.name}</h3>
                <Badge variant="secondary" className="w-fit">
                  {area.size} hectares
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {area.description}
              </p>
              {index < farmAreas.length - 1 && <Separator className="mt-4" />}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
