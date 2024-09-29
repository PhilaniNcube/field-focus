"use server";

import { fetchMutation } from "convex/nextjs";
import { z } from "zod";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { revalidatePath } from "next/cache";

const AddAreaSchema = z.object({
  name: z.string(),
  description: z.string(),
  size: z.coerce.number(),
  farmId: z.string(),
});

export const createFarmAreaAction = async (prevState: unknown, formData:FormData) => {

  const validatedData = AddAreaSchema.safeParse({
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    size: formData.get("size") as string,
    farmId: formData.get("farmId") as string,
  });



  if (!validatedData.success) {

    console.log(validatedData)

    return {
      status: "error",
      message: "Invalid form data",
      errors: validatedData.error.flatten().fieldErrors,
    }
  }

  const result = await fetchMutation(api.farmAreas.createFarmArea, {
    name: validatedData.data.name,
    description: validatedData.data.description,
    size: validatedData.data.size,
    farmId: validatedData.data.farmId as Id<"farm">,
  })

    revalidatePath(`/dashboard/${validatedData.data.farmId}`);

  return {
    status: "success",
    message: "Farm area created successfully",
    data: result,
  }


}
