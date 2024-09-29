import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getEmployees = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("employees").collect();
  },
});

export const addEmployee = mutation({
  args: {
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
    farm_id: v.id("farm"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("employees", {
      first_name: args.first_name,
      last_name: args.last_name,
      phone_number: args.phone_number,
      employment_type: args.employment_type,
      active: args.active,
      email: args.email,
      address: args.address,
      farm_id: args.farm_id,
    });

    if (!result) {
      throw new Error("Failed to add employee");
    }

    return result;
  },
})
