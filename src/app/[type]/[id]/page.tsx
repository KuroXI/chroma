"use client";

import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import Image from "next/image";
import axios from "axios";
import {IMovieInfo, IVideo} from "@/types/Movie";
import {MediaCommunitySkin, MediaOutlet, MediaPlayer} from "@vidstack/react";
import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";
import {Separator} from "@/components/ui/separator";

export default function Page() {
  const [data, setData] = useState<IMovieInfo>();
  const [video, setVideo] = useState<IVideo>();
  const pathname = usePathname();

  useEffect(() => {
    const path = pathname.split("/");

    axios.get(`https://kurebiverse-consumet.vercel.app/meta/tmdb/info/${path[2]}?type=${path[1]}`)
      .then(({ data }) => setData(data));
  }, [pathname]);

  useEffect(() => {
    if (!data) return;

    axios.get(`https://kurebiverse-consumet.vercel.app/meta/tmdb/watch/${data.episodeId}?id=${data.id}`)
      .then(({ data }) => setVideo(data))
      .catch(() => {})
  }, [data]);

  return data && (
    <section>
      <div
        className={"relative min-h-[250px] h-[550px] object-contain bg-background bg-cover bg-top"}
        style={{ backgroundImage: `url(${data.cover})` }}
      >
        <div className="h-full w-full pointer-events-none bg-gradient-to-b from-transparent to-background"/>
      </div>

      <div className={"relative max-w-6xl mx-auto mt-[-120px] px-5 pt-5"}>
        <div className={"grid md:grid-cols-5 grid-rows-1 gap-5"}>
          <div className={"lg:col-span-1 lg:mx-0 row-span-1 mx-auto"}>
              <Image
                src={data?.image}
                alt={"image"}
                width="0"
                height="0"
                sizes="100vw"
                className={"w-auto h-auto min-w-[200px] min-h-[200px] max-h-[300px] rounded-md"}
              />
          </div>
          <div className={"lg:col-span-4 row-span-1 mb-10"}>
            <Image
              src={data.logos[0].url}
              alt={data.title}
              width="0"
              height="0"
              sizes="100vw"
              className={"w-auto h-full max-h-[120px] rounded-md mx-auto lg:mx-0"}
            />
            <h1 className={"text-md text-muted-foreground max-w-3xl mt-5 md:line-clamp-6"}>
              {data.description}
            </h1>
          </div>
        </div>
        <Separator className={"my-5"}/>
        {video && (
          <MediaPlayer
            src={video.sources.filter((vid) => vid.quality === "auto")[0].url}
            aspectRatio={16 / 9}
            load="idle"
          >
            <MediaOutlet className={"relative"}>
              { video.subtitles.map((sub) => (
                <track
                  key={sub.lang}
                  src={sub.url}
                  kind={"subtitles"}
                  label={sub.lang}
                  default={sub.lang === "English"}
                />
              ))}
            </MediaOutlet>
            <MediaCommunitySkin/>
          </MediaPlayer>
        )}
      </div>
    </section>
  )
}