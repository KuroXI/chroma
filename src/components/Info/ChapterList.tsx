"use client";

import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState
} from "@tanstack/table-core";
import {useState} from "react";
import {flexRender, useReactTable} from "@tanstack/react-table";
import {IChapter} from "@/types/Manga";
import Link from "next/link";
import {ScrollArea} from "@/components/ui/scroll-area";

interface ChapterListProps {
  chapters: IChapter[]
}

export const columns: ColumnDef<IChapter>[] = [{
  accessorKey: "chapter",
  header: () => <p className={"text-center"}>Chapter</p>,
  cell: ({ row }) => <div className="capitalize line-clamp-2 text-center">{row.getValue("chapter")}</div>
}, {
  accessorKey: "title",
  header: () => <p className={"text-left"}>Title</p>,
  cell: ({ row }) => <div>{row.getValue("title")}</div>,
}]

export function ChapterList({ chapters } : ChapterListProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: chapters,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters }
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Search..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <ScrollArea className="rounded-md border md:h-[800px] h-[500px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <Link href={`/read/${row.original.id}`}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Link>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}