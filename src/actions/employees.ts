"use server";

import { fetchMutation } from "convex/nextjs";
import {z} from "zod";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { revalidatePath } from "next/cache";

const EmployeeSchema = z.object({
  farm_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().optional(),
  phone_number: z.string().optional(),
  address: z.string().optional(),
  employment_type: z.union([
    z.literal("full-time"),
    z.literal("part-time"),
    z.literal("contractor")
  ]),
  active: z.boolean().default(true),
});

export const addEmployeeAction = async (prevState:unknown, formData:FormData) => {

  console.log(formData.get("active"));

  const validatedFields = EmployeeSchema.safeParse({
    farm_id: formData.get("farm_id"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    phone_number: formData.get("phone_number"),
    address: formData.get("address"),
    employment_type: formData.get("employment_type"),
    active: formData.get("active") === "on" ? true : false,
  });

      console.log(JSON.stringify(validatedFields));

  if (!validatedFields.success) {



    return {
      errors: validatedFields.error.flatten().fieldErrors,
      status: "error",
      message: "Invalid form fields",
    }
  }


  const result = fetchMutation(api.employees.addEmployee, {
    farm_id: validatedFields.data.farm_id as Id<"farm">,
    first_name: validatedFields.data.first_name,
    last_name: validatedFields.data.last_name,
    email: validatedFields.data.email,
    phone_number: validatedFields.data.phone_number,
    address: validatedFields.data.address,
    employment_type: validatedFields.data.employment_type,
    active: validatedFields.data.active,
  })

    revalidatePath(`/dashboard/${validatedFields.data.farm_id}`);

  return {
    status: "success",
    message: "Employee added successfully",
    data: result,
  }



};
