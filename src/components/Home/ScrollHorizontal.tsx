"use client";

import {createRef, useEffect, useState} from "react";
import {axiosInstance} from "@/api/axios";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {IInfo, IResult} from "@/types/Movie";
import Image from "next/image";
import {parseImage} from "@/lib/utils";
import Link from "next/link";

interface ScrollHorizontalProps {
  title: string
  endpoints: string
  type: "tv" | "movie"
}

export default function ScrollHorizontal({ title, endpoints, type } : ScrollHorizontalProps) {
  const [data, setData] = useState<IInfo[]>();
  const sliderRef = createRef<HTMLDivElement>();

  useEffect(() => {
    axiosInstance
      .get(endpoints)
      .then(({ data } : { data: IResult<IInfo> }) => setData(data.results));
  }, [endpoints]);

  return (
    <section className={"pb-[2rem]"}>
      <h1 className={"lg:text-[1.5rem] md:text-[1.2rem] sm:text-[1.0rem] font-[800] ml-10 mb-2 capitalize"}>{title}</h1>
      <div className={"relative flex items-center px-0 sm:px-3"}>
        <ChevronLeft
          className={"mx-1 w-20 h-20 md:visible collapse"}
          onClick={(() => sliderRef.current!.scrollLeft -= (window.innerWidth - 400))}
        />
        <div ref={sliderRef} className={"slider whitespace-nowrap overflow-x-scroll overflow-y-hidden scroll-smooth pb-2"}>
          {data?.map((manga) => (
            <Link
              href={`/${type}/${manga.id}`}
              key={manga.id}
              className={"relative max-w-[180px] max-h-[250px] min-w-[150px] min-h-[200px] w-[20vw] h-[26vw] inline-block overflow-hidden mr-2 rounded-md hover:border-primary hover:border-2"}
            >
              <Image
                key={manga.id}
                src={parseImage(manga.poster_path)}
                alt={manga.poster_path}
                fill
                sizes={"(min-width: 1080px) 180px, (min-width: 800px) calc(15.38vw + 37px), 146px"}
              />
            </Link>
          ))}
        </div>
        <ChevronRight
          className={"mx-1 w-20 h-20 md:visible collapse"}
          onClick={(() => sliderRef.current!.scrollLeft += (window.innerWidth - 400))}
        />
      </div>
    </section>
  )
}