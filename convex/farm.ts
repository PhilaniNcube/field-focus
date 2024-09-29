import { v } from "convex/values";
import { query, mutation } from "./_generated/server";



export const getFarm = query({
  args: {
    farmId: v.id("farm"),
  },
  handler: async (ctx, args) => {
    const farm =  await ctx.db.get(args.farmId);
    return farm;
  },
});

export const getMyFarms = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const farms = await ctx.db.query("farm").filter((q) => q.eq(q.field("createdBy"), args.userId)).collect();
    return farms;
  },
});

export const createFarm = mutation({
  args: {
    name: v.string(),
    location: v.string(),
    size: v.number(),
    description: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const userId = args.userId;

     if (!userId) {
      throw new Error("You must be logged in to create a farm");
    }


    return await ctx.db.insert("farm", {
      name: args.name,
      location: args.location,
      size: args.size,
      description: args.description,
      createdBy: userId,
    });
  },
});
