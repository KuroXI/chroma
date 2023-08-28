"use client";

import {useEffect, useState} from "react";
import {IManga, IResult} from "@/types/Manga";
import Image from "next/image";
import {axiosInstance} from "@/api/axios";
import Link from "next/link";

type FeatureRowType = {
  title: string
  sort: string
}

export default function FeaturedRow({ title, sort } : FeatureRowType) {
  const [data, setData] = useState<IResult<IManga>>();

  useEffect(() => {
    axiosInstance
      .get(`/meta/anilist/advanced-search?type=MANGA&page=1&perPage=5&sort=["${sort}"]`)
      .then(({ data } : { data: IResult<IManga> }) => setData(data))
  }, [sort, title]);

  return (
    <section>
      <div className={"flex flex-row justify-between items-center mb-2"}>
        <h1 className={"text-2xl font-bold text-primary uppercase"}>{title}</h1>
      </div>
      <ul role={"list"} className={"divide-y divide-muted"}>
        {data?.results.map((manga) => (
          <li key={manga.id} className={"group flex justify-between gap-x-6 py-5 hover:bg-muted/50 hover:rounded-md"}>
            <a href={`/manga/${manga.id}`} className={"cursor-pointer w-full"}>
              <div className={"flex min-w-0 gap-x-4"}>
                <div className={"flex-none relative h-32 w-24"}>
                  <Image
                    src={manga.image}
                    alt={manga.id}
                    fill
                    sizes={"(min-width: 1080px) 200px, (min-width: 800px) calc(15.38vw + 37px), 146px"}
                    className={"rounded-md"}
                  />
                </div>
                <div className={"min-x-0 flex-auto"}>
                  <h1 className={"text-lg group-hover:text-primary font-semibold leading-5 line-clamp-2"}>
                    {manga.title.english || manga.title.userPreferred || manga.title.romaji || manga.title.native}
                  </h1>
                  <p className={"mt-1 truncate text-md text-muted-foreground"}>{manga.status}</p>
                  <p className={"mt-1 truncate text-md text-muted-foreground"}>{manga.rating / 10} / 10</p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div className={"flex justify-center items-center"}>
        <Link href={`/`} className={"hover:text-primary text-muted-foreground text-md"}>View more</Link>
      </div>
    </section>
  )
}