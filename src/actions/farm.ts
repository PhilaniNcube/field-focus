"use server";

import { fetchMutation } from "convex/nextjs";

import { z } from "zod";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { revalidatePath } from "next/cache";


const AddFarmSchema = z.object({
  name: z.string(),
  location: z.string(),
  description: z.string(),
  size: z.coerce.number(),
  userId: z.string(),
});

export const createFarmAction = async (prevState:unknown, formData:FormData) => {

  const validatedFields = AddFarmSchema.safeParse({
    name: formData.get("name"),
    location: formData.get("location"),
    description: formData.get("description"),
    size: formData.get("size"),
    userId: formData.get("userId"),
  });

  if (!validatedFields.success) {
    return {
      status: 400,
      message: "Invalid fields",
    }
  }

  const data = await fetchMutation(api.farm.createFarm, {
    name: validatedFields.data.name,
    location: validatedFields.data.location,
    description: validatedFields.data.description,
    size: validatedFields.data.size,
    userId: validatedFields.data.userId as Id<"users">,
   })

   revalidatePath(`/dashboard/`, "layout");

   return {
      status: 200,
      data: data,
   }


}
