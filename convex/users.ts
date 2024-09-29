import { v } from "convex/values";
import { query, mutation } from "./_generated/server";



export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getCurrentUser = query({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {

    const user = await ctx.db.query("users").filter((q) => q.eq(q.field("clerk_id"), args.clerkId)).collect();
    console.log(user[0]);

    return user[0];

  },
});

export const getFarmMembers = query({
  args: {
    farmId: v.id("farm"),
  },
  handler: async (ctx, args) => {
    // write a query to get all users that are members of a farm
    const users = await ctx.db.query("farm_members").filter((q) => q.eq(q.field("farm_id"), args.farmId)).collect();

    return Promise.all((
      users.map(async (user) => {
        const user_id = user.user_id;
        const user_data = await ctx.db.get(user_id);
        return user_data;
      })
    ))
  },
});


export const createUser = mutation({
  args: {
    email: v.string(),
    clerk_id: v.string(),
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", args);
  },
});

export const updateUser = mutation({
  args: {
    id: v.id("users"),
    clerk_id: v.string(),
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, clerk_id, first_name, last_name } = args;

    await ctx.db.patch(id, {first_name, last_name, clerk_id});

  },
});
