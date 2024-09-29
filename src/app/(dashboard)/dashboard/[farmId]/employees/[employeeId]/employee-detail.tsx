import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  ArrowLeft,
  Pencil,
} from "lucide-react";
import { Doc } from "../../../../../../../convex/_generated/dataModel";
import Link from "next/link";
import {format} from "date-fns";

export default function EmployeeDetails({
  employee,
}: {
  employee: Doc<"employees">;
}) {
  return (
    <div className="container p-4">
      <Link href={`/dashboard/${employee.farm_id}/employees`} prefetch={false}>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Employees
        </Button>
      </Link>
      <Card className="w-full max-w-4xl ">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <User className="h-6 w-6" />
            Employee Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {employee.first_name} {employee.last_name}
              </h2>
              <Badge>{employee.active ? "Active" : "Inactive"}</Badge>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Contact Information
                </h3>
                {employee.email && (
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4" />
                    <span>{employee.email}</span>
                  </div>
                )}
                {employee.phone_number && (
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4" />
                    <span>{employee.phone_number}</span>
                  </div>
                )}
                {employee.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1" />
                    <span>{employee.address}</span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Employment Details
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>{employee.position}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{employee.employment_type}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Added on {format(employee._creationTime, "PPP")}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <Button>
                <Pencil className="mr-2" /> Edit Employee
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
