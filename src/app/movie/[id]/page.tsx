"use client";

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {IMovieInfo, IVideo} from "@/types/Movie";
import {Separator} from "@/components/ui/separator";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import {axiosConsumet} from "@/api/axios";
import Info from "@/components/Info/Info";

export default function Page() {
  const [data, setData] = useState<IMovieInfo>();
  const [video, setVideo] = useState<IVideo>();
  const { id } = useParams();

  useEffect(() => {
    axiosConsumet.get(`/meta/tmdb/info/${id}?type=movie`).then(({ data }) => {
      setData(data);
      axiosConsumet.get(`/meta/tmdb/watch/${data.episodeId}?id=${data.id}`)
        .then(({ data }) => setVideo(data))
        .catch(() => {})
    });
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
        {video && <VideoPlayer {...video}/>}
        <div className={"mt-52"}/>
      </div>
    </>
  )
}