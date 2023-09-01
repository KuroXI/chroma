"use client";

import {Key, useEffect, useState} from "react";
import {axiosTMDB} from "@/api/axios";
import {IMovie, IPerson, IShow} from "@/types/Movie";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import SearchMovie from "@/components/Search/SearchMovie";
import SearchShow from "@/components/Search/SearchShow";
import SearchPerson from "@/components/Search/SearchPerson";

export default function Search() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (!query.length) return setData(undefined);

    const timeOutId = setTimeout(() => {
      axiosTMDB.get(`/search/multi?query=${query}&language=en-US&page=1`)
        .then(({data}) => {
          setData(data.results.filter((result : any) =>
            (result.media_type === "movie")
              ? result.poster_path !== null
              : (result.media_type === "tv")
                ? result.poster_path !== null
                : result.profile_path !== null
          ));
        });
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [query]);

  return (
    <>
      <Input
        type="search"
        placeholder="Search..."
        className={"md:w-[100px] lg:w-[500px]"}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className={`absolute z-40 bg-background rounded-b-md md:w-[100px] lg:w-[500px] max-h-[500px] overflow-hidden
        ${query.length && isOpen ? "h-full transition-all duration-500" : "h-0"}
      `}>
        <div className={"flex flex-col gap-2 pt-2 mx-2 overflow-y-scroll max-h-full"}>
          {data?.map((data: IMovie | IShow | IPerson, index: Key) => {
            return data.media_type === "movie"
              ? <SearchMovie key={index} {...data as IMovie}/>
              : data.media_type === "tv"
                ? <SearchShow key={index} {...data as IShow}/>
                : <SearchPerson key={index} {...data as IPerson}/>
          })}
          { data && (
            <Link href={`/search/${query}`} className={"flex items-center justify-center mt-2 mb-4"}>View More</Link>
          )}
        </div>
      </div>
    </>
  )
}