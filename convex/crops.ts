import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getCrops = query({
  args: {
    farmId: v.id("farm"),
  },
  handler: async (ctx, args) => {
    const crops = await ctx.db.query("crops").filter((q) => q.eq(q.field("farm_id"), args.farmId)).collect();
    return crops;
  },
});

export const getCrop = query({
  args: {
    cropId: v.id("crops"),
  },
  handler: async (ctx, args) => {
    const crop = await ctx.db.get(args.cropId);
    return crop;
  },
});


export const createCrop = mutation({
  args: {
    farm_id: v.id("farm"),
    name: v.string(),
    variety: v.string(),
    description: v.string(),
    area: v.id("farm_areas"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("crops", args);
  },
});
