"use client";

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import Image from "next/image";
import {IMovieInfo, IVideo} from "@/types/Movie";
import {Separator} from "@/components/ui/separator";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import {axiosConsumet} from "@/api/axios";

export default function Page() {
  const [data, setData] = useState<IMovieInfo>();
  const [video, setVideo] = useState<IVideo>();
  const { id } = useParams();

  useEffect(() => {
    axiosConsumet.get(`/meta/tmdb/info/${id}?type=movie`)
      .then(({ data }) => setData(data));
  }, [id]);

  useEffect(() => {
    if (!data) return;

    axiosConsumet.get(`/meta/tmdb/watch/${data.episodeId}?id=${data.id}`)
      .then(({ data }) => setVideo(data))
      .catch(() => {})
  }, [data]);

  return data && (
    <section>
      <div
        className={"relative xl:h-[50vh] lg:h-[45vh] md:h-[40vh] sm:h-[35vh] h-[30vh] object-contain bg-background bg-cover bg-top"}
        style={{ backgroundImage: `url(${data.cover})` }}
      >
        <div className="h-full w-full pointer-events-none bg-gradient-to-b from-transparent to-background"/>
      </div>

      <div className={"relative max-w-6xl mx-auto mt-[-120px] px-5 pt-5"}>
        <div className={"flex md:flex-row flex-col md:items-start items-center gap-4"}>
          <div className={"md:mx-0 mx-auto"}>
            <Image
              src={data?.image}
              alt={"image"}
              width="0"
              height="0"
              sizes="100vw"
              className={"w-auto h-auto min-w-[200px] min-h-[200px] max-h-[300px] rounded-md md:block hidden"}
            />
          </div>
          <div className={"mb-10"}>
            { data.logos.length ? (
              <Image
                src={data.logos[0].url}
                alt={data.title}
                width="0"
                height="0"
                sizes="100vw"
                className={"w-auto h-full max-h-[120px] rounded-md mx-auto md:mx-0"}
              />
            ) : (
              <h1 className={"xl:text-[2.8rem] lg:text-[2.5rem] md:text-[2.3rem] sm:text-[2rem] md:max-w-[45rem] font-[800]"}>
                {data.title}
              </h1>
            )}
            <h1 className={"text-md text-muted-foreground max-w-3xl mt-5 md:line-clamp-6"}>
              {data.description}
            </h1>
          </div>
        </div>
        <Separator className={"my-5"}/>
        {video && <VideoPlayer {...video}/>}
        <div className={"mt-52"}/>
      </div>
    </section>
  )
}