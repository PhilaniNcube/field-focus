"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import AddFarmForm from "./add-farm-form";
import { Id } from "../../../../../convex/_generated/dataModel";

const FarmModal = ({userId}:{userId: Id<"users">}) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="h-6 w-6 mr-2" />
          Add Farm
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Farm</DialogTitle>
        </DialogHeader>
        <AddFarmForm userId={userId} />
      </DialogContent>
    </Dialog>
  );
};
export default FarmModal;
