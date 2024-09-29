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
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/submit-button";
import { useFormState } from "react-dom";
import { createFarmAreaAction } from "@/actions/farm-area";

const AddAreaSchema = z.object({
  name: z.string(),
  description: z.string(),
  size: z.coerce.number(),
  farmId: z.string(),
});

const AddFarmAreaModal = ({ farmId }: { farmId: Id<"farm"> }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [state, formAction] = useFormState(createFarmAreaAction, null);

  const form = useForm<z.infer<typeof AddAreaSchema>>({
    resolver: zodResolver(AddAreaSchema),
    defaultValues: {
      farmId: farmId,
    },
    mode: "onBlur",
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="">
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Farm Area
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h3 className="font-semibold">Add Farm Area</h3>
        <p className="text-muted-foreground">
          Create a new farm area for this farm were you will be planting crops
          or utilizing it for other purposes.
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
                    name="farmId"
                    render={({ field }) => (
                      <Input type="hidden" {...field} defaultValue={farmId}  className="" />
                    )}
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel
                  htmlFor="name"
                  className="font-medium text-slate-600"
                >
                  Name
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
                  htmlFor="size"
                  className="font-medium text-slate-600"
                >
                  Size (hectares)
                </FormLabel>
                <FormControl>
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        id="size"
                        className="input"
                      />
                    )}
                  />
                </FormControl>
              </FormItem>
            </div>
            <Separator className="mt-4 mb-2" />
            <FormItem>
              <FormLabel
                className="font-medium text-slate-600"
                htmlFor="description"
              >
                Description
              </FormLabel>
              <FormControl>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => <Textarea {...field} className="" />}
                />
              </FormControl>
            </FormItem>
          </Form>
          <Separator className="mt-4" />
          <SubmitButton className="mt-4">Add Farm Area</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddFarmAreaModal;
