"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Doc, Id } from "../../../../../convex/_generated/dataModel";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createCropAction } from "@/actions/crop";
import { createCustomerAction } from "@/actions/customer";

const AddCustomerSchema = z.object({
  farm_id: z.string(),
  name: z.string(),
  contact_name: z.string(),
  phone_number: z.string(),
  email: z.string().optional(),
});

const AddCustomerForm = ({
  farmId,

}: {
  farmId: Id<"farm">;

}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useFormState(createCustomerAction, null);

  const form = useForm<z.infer<typeof AddCustomerSchema>>({
    resolver: zodResolver(AddCustomerSchema),
    defaultValues: {
      farm_id: farmId,
    },
    mode: "onBlur",
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="">
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Customer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h3 className="font-semibold">Add a customer</h3>
        <p className="text-muted-foreground">Create a new customer</p>
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
                  htmlFor="name"
                  className="font-medium text-slate-600"
                >
                  Customer Name
                </FormLabel>
                <FormControl>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <Input {...field} type="text" className="" />
                    )}
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel
                  htmlFor="contact_name"
                  className="font-medium text-slate-600"
                >
                  Contact Person
                </FormLabel>
                <FormControl>
                  <FormField
                    control={form.control}
                    name="contact_name"
                    render={({ field }) => (
                      <Input {...field} id="contact_name" className="" />
                    )}
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel
                  htmlFor="email"
                  className="font-medium text-slate-600"
                >
                  Email
                </FormLabel>
                <FormControl>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        className=""
                      />
                    )}
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel
                  htmlFor="phone_number"
                  className="font-medium text-slate-600"
                >
                  Phone Number
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


            </div>
            <Separator className="my-3" />
          </Form>
          <Separator className="mt-4" />
          <SubmitButton className="mt-4">Save</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddCustomerForm;
