import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getFarmAreas = query({
  args: {
    farmId: v.id("farm"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("farm_areas")
      .filter((q) => q.eq(q.field("farm_id"), args.farmId))
      .collect();
  },
});

export const getFarmArea = query({
  args: {
    areaId: v.id("farm_areas"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.query("farm_areas").filter((q) => q.eq(q.field("_id"), args.areaId)).first();
  },
})

export const createFarmArea = mutation({
  args: {
    name: v.string(),
    size: v.number(),
    description: v.string(),
    farmId: v.id("farm"),
  },
  handler: async (ctx, args) => {

    return await ctx.db.insert("farm_areas", {
      name: args.name,
      size: args.size,
      description: args.description,
      farm_id: args.farmId,
    });
  },
})
