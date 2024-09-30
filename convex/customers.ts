import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getCustomers = query({
  args: {
    farmId: v.id("farm"),
  },
  handler: async (ctx, args) => {
    const customers = await ctx.db.query("customers").filter((q) => q.eq(q.field("farm_id"), args.farmId)).collect();

    return customers;
  },
});

export const getCustomer = query({
  args: {
    customerId: v.id("customers"),
  },
  handler: async (ctx, args) => {
    const customer = await ctx.db.get(args.customerId);
    return customer;
  },
});

export const createCustomer = mutation({
  args: {
    farm_id: v.id("farm"),
    name: v.string(),
    contact_person: v.string(),
    phone_number: v.string(),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const customer = await ctx.db.insert("customers", {
      farm_id: args.farm_id,
      name: args.name,
      contact_person: args.contact_person,
      phone_number: args.phone_number,
      email: args.email,
    })

    return customer;
  }
});
