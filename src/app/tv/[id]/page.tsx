"use client";

import {ISeasonInfo} from "@/types/Movie";
import {axiosConsumet} from "@/api/axios";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import SeasonTabs from "@/components/Season/SeasonTabs";
import Info from "@/components/Info/Info";

export default function Page() {
  const [data, setData] = useState<ISeasonInfo>();
  const { id } = useParams();

  useEffect(() => {
    axiosConsumet.get(`/meta/tmdb/info/${id}?type=tv`)
      .then(({ data } : { data: ISeasonInfo }) => setData(data));
  }, [id]);

  return data && (
    <>
      <div
        className={"relative xl:h-[50vh] lg:h-[45vh] md:h-[40vh] sm:h-[35vh] h-[30vh] object-contain bg-background bg-cover bg-top"}
        style={{ backgroundImage: `url(${data.cover})` }}
      >
        <div className="h-full w-full pointer-events-none bg-gradient-to-b from-transparent to-background"/>
      </div>

      <div className={"relative max-w-6xl mx-auto mt-[-120px] px-5 pt-5"}>
        <Info {...data}/>
        <Separator className={"my-5"}/>
        <SeasonTabs seasons={data.seasons.filter((season) => season.isReleased)} />
        <div className={"mt-52"}/>
      </div>
    </>
  )
}