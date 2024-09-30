"use client";

import { useState, useMemo, Key } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  PlusIcon,
  SearchIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";

import { Doc, Id } from "../../../../../convex/_generated/dataModel";
import AddCustomerForm from "./add-customer-form";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Dummy data for customers
const initialCustomers = [
  { id: 1, name: "John Doe", email: "john@example.com", farm: "Green Acres" },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    farm: "Sunny Fields",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    farm: "Happy Valley",
  },
  // Add more dummy data to demonstrate pagination
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    farm: "Meadow Brook",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    farm: "Sunset Ranch",
  },
  { id: 6, name: "Eva White", email: "eva@example.com", farm: "Golden Fields" },
  {
    id: 7,
    name: "Frank Miller",
    email: "frank@example.com",
    farm: "River Valley",
  },
  {
    id: 8,
    name: "Grace Taylor",
    email: "grace@example.com",
    farm: "Mountain View",
  },
];

const columns: ColumnDef<Doc<"customers">>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize font-semibold">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "contact_person",
    header: "Contact Person",
    cell: ({ row }) => (
      <div className="capitalize font-semibold">
        {row.getValue("contact_person")}
      </div>
    ),
  },
  {
    accessorKey: "phone_number",
    header: "Phone",
    cell: ({ row }) => (
      <div className="capitalize font-semibold">
        <p className="text-sm">{row.getValue("phone_number")}</p>
        <p className="text-xs">{row.getValue("email")}</p>
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(customer._id)}
            >
              Customer
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


type Customer = (typeof initialCustomers)[0];

export default function CustomersPage({customers, farmId}:{customers: Doc<"customers">[], farmId: Id<"farm">}) {

  const [isOpen, setIsOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});



 const table = useReactTable({
   data: customers,
   columns,
   onSortingChange: setSorting,
   onColumnFiltersChange: setColumnFilters,
   getCoreRowModel: getCoreRowModel(),
   getPaginationRowModel: getPaginationRowModel(),
   getSortedRowModel: getSortedRowModel(),
   getFilteredRowModel: getFilteredRowModel(),
   onColumnVisibilityChange: setColumnVisibility,
   onRowSelectionChange: setRowSelection,
   state: {
     sorting,
     columnFilters,
     columnVisibility,
     rowSelection,
   },
 });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mr-4"
        />
        <AddCustomerForm farmId={farmId} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id.replace(/_/g, " ")}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
