"use client";

import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import SeasonTabs from "@/components/Season/SeasonTabs";
import {useEffect, useState} from "react";
import {ISeasonInfo, IVideo} from "@/types/Movie";
import {useParams} from "next/navigation";
import {Skeleton} from "@/components/ui/skeleton";
import {axiosConsumet} from "@/api/axios";

export default function Page() {
  const [data, setData] = useState<ISeasonInfo>();
  const [video, setVideo] = useState<IVideo>();
  const { id, episodeId } = useParams();

  useEffect(() => {
    axiosConsumet.get(`/meta/tmdb/info/${id}?type=tv`)
      .then(({ data }) => setData(data));

    axiosConsumet.get(`/meta/tmdb/watch/${episodeId}?id=${id}`)
      .then(({ data }) => setVideo(data))
      .catch(() => {});
  }, [episodeId, id]);

  return data && (
    <div className={"max-w-6xl mx-auto"}>
      {video ? <VideoPlayer {...video}/> : <Skeleton className={"w-full h-[500px]"}/>}
      <div>
        <h1>{data?.title}</h1>
      </div>
      <SeasonTabs seasons={data?.seasons}/>
      <div className={"mt-52"}/>
    </div>
  )
}