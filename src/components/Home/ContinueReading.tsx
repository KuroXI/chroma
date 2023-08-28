"use client";

import {createRef, useEffect, useState} from "react";
import {IManga, IResult} from "@/types/Manga";
import Image from "next/image";
import {axiosInstance} from "@/api/axios";
import {ChevronLeft, ChevronRight} from "lucide-react";

export default function ContinueReading() {
  const [data, setData] = useState<IManga[]>();
  const sliderRef = createRef<HTMLDivElement>();

  useEffect(() => {
    axiosInstance
      .get("/meta/anilist/advanced-search?type=MANGA&page=1&perPage=50")
      .then(({ data } : { data: IResult<IManga> }) => setData(data.results));
  }, []);

  return (
    <section className={"pb-[2rem]"}>
      <div className={"relative flex items-center px-0 sm:px-3"}>
        <ChevronLeft
          className={"mx-1 text-[3rem] md:visible collapse"}
          onClick={(() => sliderRef.current!.scrollLeft -= (window.innerWidth - 400))}
        />
        <div ref={sliderRef} className={"slider whitespace-nowrap overflow-x-scroll overflow-y-hidden scroll-smooth pb-2"}>
          {data?.map((manga) => (
            <div className={"relative max-w-[180px] max-h-[250px] min-w-[150px] min-h-[200px] w-[20vw] h-[26vw] inline-block overflow-hidden mr-4"} key={manga.id}>
              <Image
                key={manga.id}
                src={manga.image}
                alt={manga.id}
                fill
                sizes={"(min-width: 1080px) 180px, (min-width: 800px) calc(15.38vw + 37px), 146px"}
              />
            </div>
          ))}
        </div>
        <ChevronRight
          className={"mx-1 text-[3rem] md:visible collapse"}
          onClick={(() => sliderRef.current!.scrollLeft += (window.innerWidth - 400))}
        />
      </div>
    </section>
  )
}