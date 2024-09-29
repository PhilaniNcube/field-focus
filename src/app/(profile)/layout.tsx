import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { api } from "../../../convex/_generated/api";
import { redirect } from "next/navigation";


const ProfileLayout = async ({ children }: { children: ReactNode }) => {

  const {userId} = auth();

  if(!userId) {
    redirect("/sign-in");
  }

  const user = await fetchQuery(api.users.getCurrentUser, {clerkId: userId});


  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="/placeholder.svg?height=80&width=80"
                alt="Farm logo"
              />
              <AvatarFallback>GF</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-md font-bold">{user.first_name} {user.last_name}</h1>
              <p className="text-muted-foreground text-sm flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                Heartland, USA
              </p>
            </div>
          </div>
          <Link href="/">
            <Button>Back Home</Button>
          </Link>
        </div>
      </header>
      <div className="container px-4 py-8">{children}</div>
    </div>
  );
};
export default ProfileLayout;
