import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    clerk_id: v.string(),
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
  }),
  farm_members: defineTable({
    farm_id: v.id("farm"),
    user_id: v.id("users"),
    role: v.union(
      v.literal("admin"),
      v.literal("member"),
    ),
  }),
  farm: defineTable({
    name: v.string(),
    location: v.string(),
    size: v.number(),
    description: v.string(),
    createdBy: v.id("users"),
  }),
  employees: defineTable({
    farm_id: v.id("farm"),
    first_name: v.string(),
    last_name: v.string(),
    email: v.optional(v.string()),
    phone_number: v.optional(v.string()),
    address: v.optional(v.string()),
    employment_type: v.union(
      v.literal("full-time"),
      v.literal("part-time"),
      v.literal("contractor")
    ),
    active: v.boolean(),
    position: v.optional(v.string()),
  }),
  employee_wages: defineTable({
    farm_id: v.id("farm"),
    employee_id: v.id("employees"),
    wage_date: v.string(),
    payment_amount: v.number(),
    payment_method: v.union(v.literal("cash"), v.literal("eco-cash")),
  }),
  farm_areas: defineTable({
    farm_id: v.id("farm"),
    name: v.string(),
    size: v.number(),
    description: v.string(),
  }),
  crops: defineTable({
    farm_id: v.id("farm"),
    name: v.string(),
    variety: v.string(),
    description: v.string(),
    area: v.id("farm_areas"),
  }),
  input_categories: defineTable({
    farm_id: v.id("farm"),
    name: v.union(
      v.literal("seed"),
      v.literal("fertilizer"),
      v.literal("pesticide"),
      v.literal("herbicide")
    ),
  }),
  inputs: defineTable({
    farm_id: v.id("farm"),
    name: v.string(),
    category_id: v.id("input_categories"),
    description: v.string(),
    unit: v.union(
      v.literal("kg"),
      v.literal("l"),
      v.literal("g"),
      v.literal("ml"),
      v.literal("units")
    ),
  }),
  activities: defineTable({
    farm_id: v.id("farm"),
    name: v.string(),
    description: v.string(),
  }),
  crop_activities: defineTable({
    farm_id: v.id("farm"),
    crop_id: v.id("crops"),
    activity_id: v.id("activities"),
    date: v.string(),
    description: v.string(),
  }),
  livestock_activities: defineTable({
    farm_id: v.id("farm"),
    livestock_id: v.id("livestock"),
    activity_id: v.id("activities"),
    date: v.string(),
    description: v.string(),
  }),
  input_usage: defineTable({
    farm_id: v.id("farm"),
    input_id: v.id("inputs"),
    crop_id: v.id("crops"),
    area_id: v.id("farm_areas"),
    activity_id: v.id("activities"),
    quantity: v.number(),
    date: v.string(),
  }),

  livestock: defineTable({
    farm_id: v.id("farm"),
    name: v.string(),
    description: v.string(),
    quantity: v.number(),
  }),

  harvests: defineTable({
    farm_id: v.id("farm"),
    crop_id: v.id("crops"),
    quantity: v.number(),
    date: v.string(),
    area: v.id("farm_areas"),
    quality: v.union(
      v.literal("poor"),
      v.literal("average"),
      v.literal("good"),
      v.literal("excellent")
    ),
  }),
  customers: defineTable({
    farm_id: v.id("farm"),
    name: v.string(),
    contact_person: v.string(),
    phone_number: v.string(),
    email: v.optional(v.string()),
  }),
  crop_sales: defineTable({
    farm_id: v.id("farm"),
    customer_id: v.id("customers"),
    crop_id: v.id("crops"),
    quantity: v.number(),
    date: v.string(),
    payment_method: v.union(v.literal("cash"), v.literal("eco-cash")),
  }),
  livestock_sales: defineTable({
    farm_id: v.id("farm"),
    customer_id: v.id("customers"),
    livestock_id: v.id("livestock"),
    weight: v.number(),
    dry: v.boolean(),
    date: v.string(),
    payment_method: v.union(v.literal("cash"), v.literal("eco-cash")),
  }),
  expenses_categories: defineTable({
    farm_id: v.id("farm"),
    name: v.string(),
    description: v.string(),
  }),
  expenses: defineTable({
    farm_id: v.id("farm"),
    description: v.string(),
    amount: v.number(),
    date: v.string(),
    category_id: v.id("expenses_categories"),
  }),
});


