import Image from "next/image";
import {parseImage} from "@/lib/utils";
import {CommandItem} from "@/components/ui/command";
import {IMovie} from "@/types/Movie";
import Link from "next/link";
import {Dispatch, SetStateAction} from "react";

interface SearchMovieProps {
  onIsOpen:  Dispatch<SetStateAction<boolean>>
  movie: IMovie
}

export default function SearchMovie({ movie, onIsOpen } : SearchMovieProps) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      onClick={() => onIsOpen(false)}
      className={"group"}
    >
      <CommandItem className={"flex flex-row gap-4 items-center"} >
        <Image
          src={parseImage(movie.poster_path)}
          alt={movie.title}
          height={0}
          width={0}
          sizes={"100vw"}
          className={"w-auto h-[80px]"}
        />
        <div className={"flex flex-col"}>
          <h1 className={"text-lg group-hover:text-primary"}>{movie.title}</h1>
          <h1 className={"capitalize text-muted-foreground"}>{movie.media_type}</h1>
        </div>
      </CommandItem>
    </Link>
  )
}