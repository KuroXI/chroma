"use client";

import {createRef, useEffect, useState} from "react";
import {axiosTMDB} from "@/api/axios";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {IInfo, IResult} from "@/types/Movie";
import Card from "@/components/Home/Card";

interface ScrollHorizontalProps {
  title: string
  endpoints: string
  type: "tv" | "movie"
}

export default function ScrollHorizontal({ title, endpoints, type } : ScrollHorizontalProps) {
  const [data, setData] = useState<IInfo[]>();
  const sliderRef = createRef<HTMLDivElement>();

  useEffect(() => {
    axiosTMDB.get(endpoints).then(({ data } : { data: IResult<IInfo> }) => setData(data.results));
  }, [endpoints]);

  return data && (
    <>
      <h1 className={"lg:text-lg text-md font-[600] md:ml-10 ml-2 mb-2 uppercase"}>{title}</h1>
      <div className={"relative flex items-center md:px-0 px-2"}>
        <ChevronLeft
          className={"mx-1 w-20 h-20 md:visible collapse"}
          onClick={(() => sliderRef.current!.scrollLeft -= (window.innerWidth - 400))}
        />
        <div ref={sliderRef} className={"slider relative whitespace-nowrap overflow-x-scroll overflow-y-hidden scroll-smooth rounded-md"}>
          {data?.map((data, index) => <Card key={index} type={type} data={data}/>)}
        </div>
        <ChevronRight
          className={"mx-1 w-20 h-20 md:visible collapse"}
          onClick={(() => sliderRef.current!.scrollLeft += (window.innerWidth - 400))}
        />
      </div>
    </>
  )
}