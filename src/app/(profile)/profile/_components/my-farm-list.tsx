import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Leaf, MapPin } from "lucide-react";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import Link from "next/link";

const MyFarmList = async ({userId}:{userId: Id<"users">}) => {

  const farms = await fetchQuery(api.farm.getMyFarms, {userId: userId});

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold mb-6">My Farms</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {farms.map((farm) => (
          <Link key={farm._id} href={`/dashboard/${farm._id}`} className="hover:cursor-pointer">
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/10">
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  {farm.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {farm.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Size: {farm.size} hectares
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default MyFarmList;
