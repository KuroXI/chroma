import Image from "next/image";
import {parseImage} from "@/lib/utils";
import {IShow} from "@/types/Movie";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";

export default function SearchShow(show : IShow) {
  return (
    <>
      <Link href={`/tv/${show.id}`} className={"flex py-4 px-2 gap-4 hover:bg-muted rounded-md"}>
        <Image
          src={parseImage(show.poster_path)}
          alt={show.original_name}
          height={0}
          width={0}
          sizes={"100vw"}
          className={"w-auto h-[80px] rounded-md"}
        />
        <div className={"flex flex-col"}>
          <h1 className={"text-lg group-hover:text-primary"}>{show.original_name}</h1>
          <h1 className={"capitalize text-muted-foreground"}>{show.media_type}</h1>
        </div>
      </Link>
      <Separator/>
    </>
  )
}