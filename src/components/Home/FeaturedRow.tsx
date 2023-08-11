"use client";

import {useEffect, useState} from "react";
import {MangaReturnData} from "@/types/Manga";
import Image from "next/image";

type FeatureRowType = {
  title: string
  sort: string
}

export default function FeaturedRow({ title, sort } : FeatureRowType) {
  const [data, setData] = useState<MangaReturnData>();

  useEffect(() => {
    fetch(`https://api.consumet.org/meta/anilist/advanced-search?type=MANGA&page=1&perPage=5&sort=["${sort}"]`)
      .then((response) => response.json())
      .then((data : MangaReturnData) => setData(data));
  }, [sort, title]);

  return (
    <section>
      <h1 className={"text-[1.2rem] font-[600] pb-5"}>{title}</h1>
      <ul role={"list"} className={"divide-y divide-gray-700"}>
        {data?.results.map((manga) => (
          <li key={manga.id} className={"flex justify-between gap-x-6 py-5"}>
            <a href={manga.id} className={"cursor-pointer w-full"}>
              <div className={"flex min-w-0 gap-x-4"}>
                <div className={"flex-none relative h-[100px] w-[70px]"}>
                  <Image
                    src={manga.image}
                    alt={manga.id}
                    fill
                    sizes={"(min-width: 1080px) 200px, (min-width: 800px) calc(15.38vw + 37px), 146px"}
                    className={"rounded-md"}
                  />
                </div>

                <div className={"min-x-0 flex-auto"}>
                  <h1 className={"text-md font-semibold leading-6"}>
                    {manga.title.english || manga.title.userPreferred || manga.title.romaji || manga.title.native}
                  </h1>
                  <p className={"mt-1 truncate text-sm leading-5 text-gray-400"}>{manga.status}</p>
                  <p className={"mt-1 truncate text-sm leading-5 text-gray-400"}>{manga.rating / 10} / 10</p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}