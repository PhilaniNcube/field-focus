"use server";

import { fetchMutation } from "convex/nextjs";
import { z } from "zod";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { revalidatePath } from "next/cache";

const AddCustomerSchema = z.object({
  farm_id: z.string(),
  name: z.string(),
  contact_name: z.string(),
  phone_number: z.string(),
  email: z.string().optional(),
});

export const createCustomerAction = async (prevState:unknown, formData:FormData) => {

  const validatedFields = AddCustomerSchema.safeParse({
    farm_id: formData.get("farm_id"),
    name: formData.get("name"),
    contact_name: formData.get("contact_name"),
    phone_number: formData.get("phone_number"),
    email: formData.get("email"),
  })


  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return {
      message: "Invalid fields",
      status: "error",
    }
  }

  const result = await fetchMutation(api.customers.createCustomer, {
    farm_id: validatedFields.data.farm_id as Id<"farm">,
    name: validatedFields.data.name,
    contact_person: validatedFields.data.contact_name,
    phone_number: validatedFields.data.phone_number,
    email: validatedFields.data.email,
  })

  console.log(result)

  revalidatePath(`/dashboard/${validatedFields.data.farm_id}/customers`, "layout");

  return {
    message: "Customer added successfully",
    status: "success",
  }



}
