"use client";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/submit-button";
import { useFormState } from "react-dom";
import { createFarmAction } from "@/actions/farm";
import { Id } from "../../../../../convex/_generated/dataModel";

const AddFarmSchema = z.object({
  name: z.string(),
  location: z.string(),
  description: z.string(),
  size: z.coerce.number(),
  userId: z.string(),
});

const AddFarmForm = ({ userId }: { userId: Id<"users"> }) => {
  const form = useForm<z.infer<typeof AddFarmSchema>>({
    resolver: zodResolver(AddFarmSchema),
    defaultValues: {
      userId: userId,
    },
    mode: "onBlur",
  });

  const [state, formAction] = useFormState(createFarmAction, null);

  return (
    <Form {...form}>
      <form
        action={(data: FormData) => {
          const formData = new FormData();

          formData.append("name", data.get("name") as string);
          formData.append("location", data.get("location") as string);
          formData.append("description", data.get("description") as string);
          formData.append("size", data.get("size") as string);
          formData.append("userId", userId);

          formAction(formData);
        }}
        className=""
      >
        {state?.message && <div>{state.message}</div>}
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="hidden"
                  defaultValue={userId}
                  className="text-slate-800"
                  placeholder=""
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-600 font-medium mt-4">
                Farm Name
              </FormLabel>
              <FormControl>
                <Input className="text-slate-800" placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="my-4 grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-600 font-medium mt-4">
                  Farm location
                </FormLabel>
                <FormControl>
                  <Input className="text-slate-800" placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-600 font-medium mt-4">
                  Farm size (hectares)
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-slate-800"
                    type="number"
                    placeholder=""
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>{" "}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-600 font-medium mt-4">
                Farm description
              </FormLabel>
              <FormControl>
                <Textarea
                  className="text-slate-800 resize-none mb-3"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton className="mt-3">Add Farm</SubmitButton>
      </form>
    </Form>
  );
};
export default AddFarmForm;
