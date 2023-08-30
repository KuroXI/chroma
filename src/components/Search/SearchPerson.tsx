import Link from "next/link";
import {CommandItem} from "@/components/ui/command";
import Image from "next/image";
import {parseImage} from "@/lib/utils";
import {Dispatch, SetStateAction} from "react";
import {IPerson} from "@/types/Movie";

interface SearchShowProps {
  onIsOpen:  Dispatch<SetStateAction<boolean>>
  person: IPerson
}

export default function SearchPerson({ person, onIsOpen } : SearchShowProps) {
  return (
    <Link href={`/people/${person.id}`} onClick={() => onIsOpen(false)} className={"group"}>
      <CommandItem className={"flex flex-row gap-4 items-center"} >
        <Image
          src={parseImage(person.profile_path)}
          alt={person.original_name}
          height={0}
          width={0}
          sizes={"100vw"}
          className={"w-auto h-[80px]"}
        />
        <div className={"flex flex-col"}>
          <h1 className={"text-lg group-hover:text-primary"}>{person.original_name}</h1>
          <h1 className={"capitalize text-muted-foreground"}>{person.media_type}</h1>
        </div>
      </CommandItem>
    </Link>
  )
}