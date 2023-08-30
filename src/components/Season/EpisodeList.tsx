import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, getCoreRowModel } from "@tanstack/table-core";
import { flexRender, useReactTable } from "@tanstack/react-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ISeasonEpisode } from "@/types/Movie";
import Link from "next/link";
import {useParams} from "next/navigation";

interface EpisodeListProps {
  episode: ISeasonEpisode[]
}

export const columns: ColumnDef<ISeasonEpisode>[] = [{
  accessorKey: "episode",
  header: () => <p className={"text-center"}>Chapter</p>,
  cell: ({ row }) => <div className="capitalize line-clamp-2 text-center">{row.getValue("episode")}</div>
}, {
  accessorKey: "title",
  header: () => <p className={"text-left"}>Title</p>,
  cell: ({ row }) => <div>{row.getValue("title")}</div>,
}]

export function EpisodeList({ episode } : EpisodeListProps) {
  const { id, episodeId } = useParams();
  const table = useReactTable({
    data: episode,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <ScrollArea className="rounded-md border h-[500px]">
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
            <TableRow key={row.id} className={row.original.id === episodeId ? "bg-primary/50" : "" + "hover:text-primary"}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  <Link href={`/tv/${id}/${cell.row.original.id}`} className={""}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Link>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}