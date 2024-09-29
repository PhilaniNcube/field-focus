"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

import SubmitButton from "@/components/submit-button";
import { useFormState } from "react-dom";

import { addEmployeeAction } from "@/actions/employees";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const EmployeeSchema = z.object({
  farm_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().optional(),
  phone_number: z.string().optional(),
  address: z.string().optional(),
  employment_type: z.union([
    z.literal("full-time"),
    z.literal("part-time"),
    z.literal("contractor"),
  ]),
  active: z.boolean().default(true),
});

const AddEmployeeModal = ({ farmId }: { farmId: Id<"farm"> }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [state, formAction] = useFormState(addEmployeeAction, null);

  const form = useForm<z.infer<typeof EmployeeSchema>>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: {
      farm_id: farmId,
      active: true,
    },
    mode: "onBlur",
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="">
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h3 className="font-semibold">Add an employee</h3>
        <p className="text-muted-foreground">
          Add an employee to your books. You can add full-time, part-time or
          contract employees.
        </p>
        <Separator className="my-2" />
        {state?.status === "error" && (
          <p className="text-red-500">{state.message}</p>
        )}
        {state?.status === "success" && (
          <p className="text-green-500">{state.message}</p>
        )}
        <form action={formAction} className="">
          <Form {...form}>
            <div className="grid lg:grid-cols-2 gap-3">
              <FormItem className="hidden">
                <FormControl>
                  <FormField
                    control={form.control}
                    name="farm_id"
                    render={({ field }) => (
                      <Input
                        type="hidden"
                        {...field}
                        defaultValue={farmId}
                        className=""
                      />
                    )}
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel
                  htmlFor="first_name"
                  className="font-medium text-slate-600"
                >
                  First Name
                </FormLabel>
                <FormControl>
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <Input {...field} type="text" className="" />
                    )}
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel
                  htmlFor="last_name"
                  className="font-medium text-slate-600"
                >
                  Last Name
                </FormLabel>
                <FormControl>
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <Input {...field} id="last_name" className="" />
                    )}
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel
                  htmlFor="email"
                  className="font-medium text-slate-600"
                >
                  Email (optional)
                </FormLabel>
                <FormControl>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <Input {...field} id="email" type="email" className="" />
                    )}
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel
                  htmlFor="phone_number"
                  className="font-medium text-slate-600"
                >
                  Phone Number (optional)
                </FormLabel>
                <FormControl>
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="phone_number"
                        type="tel"
                        className=""
                      />
                    )}
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel
                  htmlFor="address"
                  className="font-medium text-slate-600"
                >
                  Address (optional)
                </FormLabel>
                <FormControl>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="address"
                        type="address"
                        className=""
                      />
                    )}
                  />
                </FormControl>
              </FormItem>
              <FormField
                control={form.control}
                name="employment_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <Select
                      name="employment_type"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select employment type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="full-time">Full Time</SelectItem>
                        <SelectItem value="part-time">Part Time</SelectItem>
                        <SelectItem value="contractor">Contractor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator className="my-3" />
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      name="active"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Is this employee active?</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </Form>
          <Separator className="mt-4" />
          <SubmitButton className="mt-4">Add Employee</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddEmployeeModal;
