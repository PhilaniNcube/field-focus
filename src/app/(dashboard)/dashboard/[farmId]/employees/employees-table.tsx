"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mail, Phone, MapPin } from "lucide-react";
import { Doc } from "../../../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function EmployeesTable({
  employees,
}: {
  employees: Doc<"employees">[];
}) {

  const router = useRouter();

  return (
    <Card className="w-full  mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Users className="h-6 w-6" />
          Employees
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Employment Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow onClick={() => router.push(`/dashboard/${employee.farm_id}/employees/${employee._id}`)} key={employee._id} className="cursor-pointer">
                  <TableCell className="font-medium">
                    {employee.first_name} {employee.last_name}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {employee.email && (
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-4 w-4" />
                          <span>{employee.email}</span>
                        </div>
                      )}
                      {employee.phone_number && (
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-4 w-4" />
                          <span>{employee.phone_number}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {employee.address ? (
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span>{employee.address}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        Not provided
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        employee.employment_type === "part-time" &&
                          "bg-slate-800 text-white",
                        employee.employment_type === "full-time" &&
                          "bg-zinc-800 text-white",
                        employee.employment_type === "contractor" &&
                          "bg-gray-700 text-white"
                      )}
                    >
                      {employee.employment_type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        employee.active ? "bg-green-500" : "bg-red-500",
                      )}
                    >
                      {employee.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
