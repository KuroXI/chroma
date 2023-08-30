import {CommandItem} from "@/components/ui/command";
import Image from "next/image";
import {parseImage} from "@/lib/utils";
import {IShow} from "@/types/Movie";
import Link from "next/link";
import {Dispatch, SetStateAction} from "react";

interface SearchShowProps {
  onIsOpen:  Dispatch<SetStateAction<boolean>>
  show: IShow
}

export default function SearchShow({ show, onIsOpen} : SearchShowProps) {
  return (
    <Link href={`/tv/${show.id}`} onClick={() => onIsOpen(false)} className={"group"}>
      <CommandItem className={"flex flex-row gap-4 items-center"} >
        <Image
          src={parseImage(show.poster_path)}
          alt={show.original_name}
          height={0}
          width={0}
          sizes={"100vw"}
          className={"w-auto h-[80px]"}
        />
        <div className={"flex flex-col"}>
          <h1 className={"text-lg group-hover:text-primary"}>{show.original_name}</h1>
          <h1 className={"capitalize text-muted-foreground"}>{show.media_type}</h1>
        </div>
      </CommandItem>
    </Link>
  )
}