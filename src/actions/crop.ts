"use server";

import { fetchMutation } from "convex/nextjs";
import { z } from "zod";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { revalidatePath } from "next/cache";

const AddCropSchema = z.object({
  farm_id: z.string(),
  name: z.string(),
  variety: z.string(),
  description: z.string(),
  area: z.string(),
});

export async function createCropAction(prevState:unknown, formData:FormData) {

  const validatedFields = AddCropSchema.safeParse({
    farm_id: formData.get("farm_id") as string,
    name: formData.get("name") as string,
    variety: formData.get("variety") as string,
    description: formData.get("description") as string,
    area: formData.get("area") as string,
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid fields",
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const result = await fetchMutation(api.crops.createCrop, {
    farm_id: validatedFields.data.farm_id as Id<"farm">,
    name: validatedFields.data.name,
    variety: validatedFields.data.variety,
    description: validatedFields.data.description,
    area: validatedFields.data.area as Id<"farm_areas">,
  })

  revalidatePath(`/dashboard/${validatedFields.data.farm_id}`, "layout");

  return {
    message: "Crop added successfully",
    status: "success",
    data: result,
  }


}
