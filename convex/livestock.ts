import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const getLivestock = query({
  args: {
    farmId: v.id("farm"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("livestock")
      .filter((q) => q.eq(q.field("farm_id"), args.farmId))
      .collect();
  },
})

export const addLivestock = mutation({
  args: {
    farmId: v.id("farm"),
    name: v.string(),
    quantity: v.number(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("livestock", {
      farm_id: args.farmId,
      name: args.name,
      quantity: args.quantity,
      description: args.description,
    });
  },
})
