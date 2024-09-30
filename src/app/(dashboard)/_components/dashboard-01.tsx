"use client";

import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ReactNode } from "react";
import { useParams } from "next/navigation";

export function FarmDashboard({ children }: { children: ReactNode }) {

const {farmId} = useParams()



  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 w-full">
          <Link
            href={`/dashboard/${farmId}`}
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Field Focus</span>
          </Link>
          <Link
            href={`/dashboard/${farmId}/employees`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Employees
          </Link>
          <Link
            href={`/dashboard/${farmId}/farm-areas`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Farm Areas
          </Link>
          <Link
            href={`/dashboard/${farmId}/crops`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Crops
          </Link>
          <Link
            href={`/dashboard/${farmId}/livestock`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Livestock
          </Link>
          <Link
            href={`/dashboard/${farmId}/customers`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Customers
          </Link>
          <Link
            href={`/dashboard/${farmId}/sales`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Sales
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href={`/dashboard/${farmId}`}
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Field Focus</span>
              </Link>
              <Link
                href={`/dashboard/${farmId}/employees`}
                className="text-muted-foreground hover:text-foreground"
              >
                Employees
              </Link>
              <Link
                href={`/dashboard/${farmId}/farm-areas`}
                className="text-muted-foreground hover:text-foreground"
              >
                Farm Areas
              </Link>
              <Link
                href={`/dashboard/${farmId}/crops`}
                className="text-muted-foreground hover:text-foreground"
              >
                Crops
              </Link>
              <Link
                href={`/dashboard/${farmId}/livestock`}
                className="text-muted-foreground hover:text-foreground"
              >
                Livestock
              </Link>
              <Link
                href={`/dashboard/${farmId}/customers`}
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link
                href={`/dashboard/${farmId}/sales`}
                className="text-muted-foreground hover:text-foreground"
              >
                Sales
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
