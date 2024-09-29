

import { fetchQuery } from "convex/nextjs";
import FarmModal from "./_components/farm-modal";
import { api } from "../../../../convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { Id } from "../../../../convex/_generated/dataModel";
import MyFarmList from "./_components/my-farm-list";


const ProfilePage = async () => {

   const clerkUser = auth()

   const clerkUserId = clerkUser.userId as Id<"users">;
   const {_id} = await fetchQuery(api.users.getCurrentUser, {
     clerkId: clerkUserId,
   });



  return (
    <div className="container lg:px-10">
      <div className="flex justify-between">
      <FarmModal userId={_id} />
      </div>
      <MyFarmList userId={_id} />
    </div>
  );
};
export default ProfilePage;
