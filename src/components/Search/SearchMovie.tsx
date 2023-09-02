import Image from "next/image";
import {parseImage} from "@/lib/utils";
import {IMovie} from "@/types/Movie";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import {Dispatch, SetStateAction} from "react";

type SearchMovieProps = {
  movie: IMovie
  onClick: Dispatch<SetStateAction<boolean>>
}

export default function SearchMovie({ movie, onClick } : SearchMovieProps) {
  return (
    <>
      <Link
        href={`/movie/${movie.id}`}
        className={"flex py-4 px-2 gap-4 hover:bg-muted rounded-md"}
        onClick={() => onClick(false)}
      >
        <Image
          src={parseImage(movie.poster_path)}
          alt={movie.title}
          height={0}
          width={0}
          sizes={"100vw"}
          className={"w-auto h-[80px] rounded-md"}
        />
        <div className={"flex flex-col"}>
          <h1 className={"text-lg group-hover:text-primary"}>{movie.title}</h1>
          <h1 className={"capitalize text-muted-foreground"}>{movie.media_type}</h1>
        </div>
      </Link>
      <Separator/>
    </>
  )
}