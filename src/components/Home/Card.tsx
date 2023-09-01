import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {parseImage} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {MovieCardType, ShowCardType} from "@/types/Movie";

interface CardProps {
  type: string
  data: MovieCardType | ShowCardType
}

export default function Card({ type, data } : CardProps) {
  return (
    <Link href={`/${type}/${data.id}`} className={"scroll-horizontal"}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Image
            key={data.id}
            src={parseImage(data?.poster_path)}
            alt={data.poster_path}
            fill
            sizes={"(min-width: 1080px) 180px, (min-width: 800px) calc(15.38vw + 37px), 146px"}
          />
        </HoverCardTrigger>
        <HoverCardContent className="w-full max-w-xl h-full">
          {type === "movie" ? <MovieCard {...data as MovieCardType}/> : <ShowCard {...data as ShowCardType}/>}
        </HoverCardContent>
      </HoverCard>
    </Link>
  )
}

function ShowCard(data : ShowCardType) {
  return (
    <div className="flex justify-between space-x-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{data.name}</h1>
        <div className={"flex item-center py-2 gap-4"}>
          <h1 className={"text-sm text-muted-foreground"}>{data.first_air_date}</h1>
          <h1 className={"text-sm text-muted-foreground"}>{data.origin_country}</h1>
        </div>
        <h1 className="text-sm whitespace-pre-line line-clamp-4">{data.overview}</h1>
      </div>
    </div>
  )
}

function MovieCard(data : MovieCardType) {
  return (
    <div className="flex justify-between space-x-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{data.title}</h1>
        <div className={"flex item-center py-2 gap-4"}>
          <h1 className={"text-sm text-muted-foreground"}>{data.release_date}</h1>
        </div>
        <h1 className="text-sm whitespace-pre-line line-clamp-4">{data.overview}</h1>
      </div>
    </div>
  )
}