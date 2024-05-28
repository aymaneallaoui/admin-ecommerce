"use client";

import {
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  Loader2Icon,
  Trash2Icon,
} from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  RowData,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams, usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Size } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const router = useRouter();
  const params = useParams();
  const pathName = usePathname();
  const [loading, setLoading] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });

  const onDelete = async (data: TData[]) => {
    const currentPath = pathName.split("/").pop();
    if (currentPath === "billboards") {
      // @ts-ignore
      const arrayOfIds = data.map((item: Size) => item.id);
      try {
        setLoading(true);
        await axios.delete(`/api/${params.storeId}/billboards`, {
          data: arrayOfIds,
        });
        router.refresh();
        router.push(`/${params.storeId}/billboards`);
        toast.success("Size deleted.");
      } catch (error: any) {
        toast.error(
          "Make sure you removed all categories using this billboard first."
        );
      } finally {
        setLoading(false);
      }
    }

    if (currentPath === "sizes") {
      // @ts-ignore
      const arrayOfIds = data.map((item: Size) => item.id);
      try {
        setLoading(true);
        await axios.delete(`/api/${params.storeId}/sizes`, {
          data: arrayOfIds,
        });
        router.refresh();
        router.push(`/${params.storeId}/sizes`);
        toast.success("Size deleted.");
      } catch (error: any) {
        toast.error(
          "Make sure you removed all categories using this billboard first."
        );
      } finally {
        setLoading(false);
      }
    }

    if (currentPath === "categories") {
      // @ts-ignore
      const arrayOfIds = data.map((item: Size) => item.id);
      try {
        setLoading(true);
        await axios.delete(`/api/${params.storeId}/categories`, {
          data: arrayOfIds,
        });
        router.refresh();
        router.push(`/${params.storeId}/categories`);
        toast.success("Size deleted.");
      } catch (error: any) {
        toast.error(
          "Make sure you removed all categories using this billboard first."
        );
      } finally {
        setLoading(false);
      }
    }

    if (currentPath === "colors") {
      // @ts-ignore
      const arrayOfIds = data.map((item: Size) => item.id);
      try {
        setLoading(true);
        await axios.delete(`/api/${params.storeId}/colors`, {
          data: arrayOfIds,
        });
        router.refresh();
        router.push(`/${params.storeId}/colors`);
        toast.success("Selected Colors deleted.");
      } catch (error: any) {
        toast.error(
          "Make sure you removed all categories using this billboard first."
        );
      } finally {
        setLoading(false);
      }
    }
    if (currentPath === "products") {
      // @ts-ignore
      const arrayOfIds = data.map((item: Size) => item.id);

      console.log(arrayOfIds);
      try {
        setLoading(true);
        await axios.delete(`/api/${params.storeId}/products`, {
          data: arrayOfIds,
        });
        router.refresh();
        router.push(`/${params.storeId}/products`);
        toast.success("Selected products deleted.");
      } catch (error: any) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search"
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <Button
            variant="destructive"
            size="sm"
            className="ml-2"
            disabled={loading}
            onClick={() =>
              onDelete(
                table
                  .getFilteredSelectedRowModel()
                  .rows.map((row) => row.original)
              )
            }
          >
            <Trash2Icon className="w-4 h-4 mr-2" />
            Delete All selected items
            {loading && <Loader2Icon className="w-4 h-4 ml-2 animate-spin" />}
          </Button>
        ) : null}
      </div>

      <div className="border rounded-md">
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
      <div className="flex items-center justify-end py-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftCircleIcon className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
          <ChevronRightCircleIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    </div>
  );
}
