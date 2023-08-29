import Image from "next/image";
import {parseImage} from "@/lib/utils";
import Link from "next/link";
import {IInfo} from "@/types/Movie";

export default function CardHorizontal(manga : IInfo) {
  return (
    <Link
      href={`/info/${manga.id}`}
      className={"relative max-w-[400px] max-h-[250px] min-w-[150px] min-h-[200px] w-full h-auto inline-block overflow-hidden mr-2 rounded-md"}
    >
      <Image
        key={manga.id}
        src={parseImage(manga.backdrop_path)}
        alt={manga.backdrop_path}
        fill
        sizes={"(min-width: 1080px) 500px, (min-width: 800px) calc(15.38vw + 37px), 146px"}
      />
    </Link>
  )
}