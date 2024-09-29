"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CircleDashed } from "lucide-react";

const SubmitButton = ({className, children}:{className?:string, children:ReactNode}) => {

  const {pending} = useFormStatus();

  return <Button type="submit" className={cn("w-full",
    className,
    pending ? "animate-pulse" : null
  )}>
  {pending ? <CircleDashed className="h-4 w-4 animate-spin" /> : children}
  </Button>;
};
export default SubmitButton;
