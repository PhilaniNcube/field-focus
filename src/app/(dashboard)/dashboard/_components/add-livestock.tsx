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

import { createLivestockAction } from "@/actions/livestock";

const AddLivestockSchema = z.object({
  farm_id: z.string(),
  name: z.string(),
  quantity: z.coerce.string(),
  description: z.string(),
});

const AddLivestock = ({
  farmId,
  areas,
}: {
  farmId: Id<"farm">;
  areas: Doc<"farm_areas">[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useFormState(createLivestockAction, null);

  const form = useForm<z.infer<typeof AddLivestockSchema>>({
    resolver: zodResolver(AddLivestockSchema),
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
          Add Livestock
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h3 className="font-semibold">Add livestock</h3>

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
                  htmlFor="quantity"
                  className="font-medium text-slate-600"
                >
                  quantity
                </FormLabel>
                <FormControl>
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <Input
                        type="number"
                        {...field}
                        id="quantity"
                        className=""
                      />
                    )}
                  />
                </FormControl>
              </FormItem>
            </div>

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
            <Separator className="my-3" />
          </Form>
          <Separator className="mt-4" />
          <SubmitButton className="mt-4">Save</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddLivestock;
