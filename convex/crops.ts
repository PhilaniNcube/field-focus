import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getCrops = query({
  args: {
    farmId: v.id("farm"),
  },
  handler: async (ctx, args) => {
    const crops = await ctx.db.query("crops").filter((q) => q.eq(q.field("farm_id"), args.farmId)).collect();

    const cropsWithArea = await Promise.all(crops.map(async (crop) => {
      const area = await ctx.db.query("farm_areas").filter((q) => q.eq(q.field("_id"), crop.area)).first();
      return {...crop, area};
    }));

    return cropsWithArea;

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
