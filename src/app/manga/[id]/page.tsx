"use client";

import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {axiosInstance} from "@/api/axios";
import {IManga} from "@/types/Manga";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {cleanDescription, filterEnglish} from "@/lib/utils";
import {ChapterList} from "@/components/Info/ChapterList";
import {Separator} from "@/components/ui/separator";

export default function Page() {
  const [data, setData] = useState<IManga>()
  const pathname = usePathname();

  useEffect(() => {
    axiosInstance
      .get(`/meta/anilist-manga/info/${pathname.split("/")[2]}?provider=mangareader`)
      .then(({ data }) => setData(data));
  }, [pathname]);

  return data && (
    <section>
      { data?.cover && (
        <>
          <Image
            src={data?.cover!}
            alt={data?.title.english || data?.title.userPreferred || data?.title.native || data?.title.romaji!}
            width="0"
            height="0"
            sizes="100vw"
            className={"w-full h-auto rounded-md"}
          />
          <div className="h-full w-full z-[99] pointer-events-none bg-gradient-to-b from-transparent to-primary relative top-[100px]"/>
        </>
      )}
      <div className={"relative max-w-6xl mx-auto mt-[-90px] px-5 pt-5 h-screen"}>
        <div className={"grid md:grid-cols-5 sm:grid-rows-none gap-5 items-center"}>
          <div className={"col-span-1"}>
            <Image
              src={data?.image!}
              alt={data?.title.english || data?.title.userPreferred || data?.title.native || data?.title.romaji!}
              width="0"
              height="0"
              sizes="100vw"
              className={"w-auto h-full max-h-[320px] rounded-md"}
            />
            <Button className={"w-full mt-2"}>Read First Chapter</Button>
          </div>
          <div className={"col-span-4 items-center mb-10"}>
            <h1 className={"text-3xl text-primary font-bold mt-5"}>
              {data?.title.english || data?.title.userPreferred || data?.title.native || data?.title.romaji}
            </h1>
            <h1 className={"text-md text-muted-foreground max-w-3xl mt-5 line-clamp-6"}>
              {cleanDescription(data?.description)}
            </h1>
          </div>
        </div>
        <Separator className={"my-5"}/>
        <ChapterList chapters={filterEnglish(data.chapters)}/>
      </div>
    </section>
  )
}