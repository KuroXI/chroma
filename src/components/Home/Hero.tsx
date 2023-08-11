"use client";

import {useEffect, useState} from "react";
import {MangaResult} from "@/types/Manga";

export default function Hero() {
  const [data, setData] = useState<MangaResult>();

  useEffect(() => {
    fetch(`https://api.consumet.org/meta/anilist/advanced-search?type=MANGA&page=1&perPage=50&sort=["POPULARITY_DESC"]`)
      .then((response) => response.json())
      .then((data) => {
        const random = Math.floor(Math.random() * data.results.length);
        const filteredData : MangaResult[] = data.results.filter((manga : MangaResult) => manga.cover !== null);
        setData(filteredData[random]);
      })
  }, []);

  return (
    <header
      className={"relative h-[550px] text-white object-contain"}
      style={{
        backgroundImage: `url(${data?.cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center center"
      }}
    >
      <div className={"absolute sm:ml-[30px] lg:ml-[100px] pt-[140px]"}>
        <h1 className={"xl:text-[2.8rem] lg:text-[2.5rem] md:text-[2.3rem] sm:text-[2rem] md:max-w-[45rem] font-[800] pb-[0.3rem]"}>
          {data?.title.english || data?.title.userPreferred || data?.title.romaji || data?.title.native}
        </h1>
        <h1 className={"md:max-w-[45rem] sm:max-w-[20rem] text[1.2rem] md:text-[1rem] sm:text-[0.9rem] md:line-clamp-none line-clamp-[9]"}>
          {data?.description.replace(/\(Source:[\s\S]*$/g, '').replace(/<[^>]*>/g, '')}
        </h1>
      </div>
      <div className="h-full w-full pointer-events-none bg-gradient-to-b from-transparent to-[#141414]"/>
    </header>
  )
}