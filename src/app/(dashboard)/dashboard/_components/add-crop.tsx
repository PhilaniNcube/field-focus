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


const AddCropSchema = z.object({
  farm_id: z.string(),
  name: z.string(),
  variety: z.string(),
  description: z.string(),
  area: z.string(),
});

const AddCropModal = ({ farmId, areas }: { farmId: Id<"farm">, areas: Doc<"farm_areas">[] }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useFormState(createCropAction, null);


  const form = useForm<z.infer<typeof AddCropSchema>>({
    resolver: zodResolver(AddCropSchema),
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
          Add Crop
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h3 className="font-semibold">Add a crop</h3>
        <p className="text-muted-foreground">Add a crop to your farm.</p>
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
                  Crop Name
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
                  htmlFor="variety"
                  className="font-medium text-slate-600"
                >
                  Variety
                </FormLabel>
                <FormControl>
                  <FormField
                    control={form.control}
                    name="variety"
                    render={({ field }) => (
                      <Input {...field} id="variety" className="" />
                    )}
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel
                  htmlFor="description"
                  className="font-medium text-slate-600"
                >
                  Description
                </FormLabel>
                <FormControl>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="description"
                        type="description"
                        className=""
                      />
                    )}
                  />
                </FormControl>
              </FormItem>

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Farm Area</FormLabel>
                    <Select
                      name="area"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select farm area" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {areas.map((area) => (
                          <SelectItem key={area._id} value={area._id}>{area.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
export default AddCropModal;
