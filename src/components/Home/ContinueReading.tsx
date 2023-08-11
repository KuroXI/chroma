"use client";

import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {createRef, useEffect, useState} from "react";
import {MangaResult} from "@/types/Manga";
import Image from "next/image";

export default function ContinueReading() {
  const [data, setData] = useState<MangaResult[]>();

  const sliderRef = createRef<HTMLDivElement>();

  useEffect(() => {
    fetch(`https://api.consumet.org/meta/anilist/advanced-search?type=MANGA&page=1&perPage=50`)
      .then((response) => response.json())
      .then((data) => setData(data.results))
  }, []);

  return (
    <section className={"text-white pb-[2rem]"}>
      <div className={"flex flex-row justify-between items-center md:pl-[40px] md:pr-[40px] sm:pl-[20px] sm:pr-[20px]"}>
        <h2 className={"lg:text-[2rem] md:text-[1.5rem] sm:text-[1.2rem] font-[800]"}>Continue Reading</h2>
        <a href={"/history"} className={"hover:underline lg:text-[1.2rem] md:text-[1rem] sm:text-[0.8rem]"}>
          <h1>See more<span><ChevronRight/></span></h1>
        </a>
      </div>

      <div className={"relative flex items-center"}>
        <ChevronLeft
          className={"md:ml-[10px] md:mr-[10px] sm:ml-[-10px] sm:mr-[-10px] text-[3rem] md:visible sm:invisible"}
          onClick={(() => sliderRef.current!.scrollLeft -= 500)}
        />
        <div ref={sliderRef} className={"slider whitespace-nowrap overflow-x-scroll overflow-y-hidden scroll-smooth"}>
          {data?.map((manga) => (
            <div className={"relative max-w-[200px] max-h-[300px] min-w-[150px] min-h-[200px] w-[20vw] h-[26vw] inline-block overflow-hidden mr-4"} key={manga.id}>
              <Image
                key={manga.id}
                src={manga.image}
                alt={manga.id}
                fill
                sizes={"(min-width: 1080px) 200px, (min-width: 800px) calc(15.38vw + 37px), 146px"}
              />
            </div>
          ))}
        </div>
        <ChevronRight
          className={"md:ml-[10px] md:mr-[10px] sm:ml-[-10px] sm:mr-[0px] text-[3rem] md:visible sm:invisible"}
          onClick={(() => sliderRef.current!.scrollLeft += 500)}
        />
      </div>
    </section>
  )
}