import Link from "next/link";
import Image from "next/image";
import {parseImage} from "@/lib/utils";
import {IPerson} from "@/types/Movie";
import {Separator} from "@/components/ui/separator";

export default function SearchPerson(person : IPerson) {
  return (
    <>
      <Link href={`/person/${person.id}`} className={"flex py-4 px-2 gap-4 hover:bg-muted rounded-md"}>
        <Image
          src={parseImage(person.profile_path)}
          alt={person.original_name}
          height={0}
          width={0}
          sizes={"100vw"}
          className={"w-auto h-[80px] rounded-md"}
        />
        <div className={"flex flex-col"}>
          <h1 className={"text-lg group-hover:text-primary"}>{person.original_name}</h1>
          <h1 className={"capitalize text-muted-foreground"}>{person.media_type}</h1>
        </div>
      </Link>
      <Separator/>
    </>
  )
}