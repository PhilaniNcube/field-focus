"use server";

import { fetchMutation } from "convex/nextjs";
import { z } from "zod";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { revalidatePath } from "next/cache";

const AddLivestockSchema = z.object({
  farm_id: z.string(),
  name: z.string(),
  quantity: z.coerce.string(),
  description: z.string(),
});

export async function createLivestockAction(prevState:unknown, formData:FormData) {

  const data = AddLivestockSchema.safeParse({
    farm_id: formData.get("farm_id"),
    name: formData.get("name"),
    quantity: formData.get("quantity"),
    description: formData.get("description"),
  });

  if (!data.success) {
    return {
      status: "error",
      message: "Invalid data",
    }
  }

  const result = await fetchMutation(api.livestock.addLivestock, {
    farmId: data.data.farm_id as Id<"farm">,
    name: data.data.name,
    quantity: Number(data.data.quantity),
    description: data.data.description,
  })

  revalidatePath(`/dashboard/${data.data.farm_id}/livestock`);

  return {
    status: "success",
    result: result,
    message: "Livestock added successfully",
  }


}
