"use client";

import {useEffect, useState} from "react";
import {axiosInstance} from "@/api/axios";
import {parseImage} from "@/lib/utils";
import {IInfo, ILogo} from "@/types/Movie";
import Image from "next/image";

export default function Hero() {
  const [data, setData] = useState<IInfo>();
  const [logo, setLogo] = useState<ILogo>();

  useEffect(() => {
    axiosInstance
      .get(`/movie/popular?language=en-US&page=1`)
      .then(({ data }) => {
        const random = Math.floor(Math.random() * data.results.length);
        setData(data.results[random]);
      })
  }, []);

  useEffect(() => {
    if (!data) return;
    axiosInstance.get(`/movie/${data?.id}/images`).then((response) => {
      const { logos } = response.data;
      setLogo(logos.filter((logo : ILogo) => logo.iso_639_1 === "en")[0])
    });
  }, [data]);

  return (
    <header
      className={"relative h-[550px] object-contain bg-background"}
      style={{
        backgroundImage: `url(${parseImage(data?.backdrop_path)})`,
        backgroundSize: "cover",
        backgroundPosition: "top center"
      }}
    >
      <div className={"absolute sm:ml-[30px] lg:ml-[100px] pt-40"}>
        { logo?.file_path ? (
          <Image
            src={parseImage(logo.file_path)}
            alt={logo.file_path!}
            width="0"
            height="0"
            sizes="100vw"
            className={"w-auto h-full min-h-[100px] max-h-[120px] rounded-md"}
          />
        ) : (
          <h1 className={"xl:text-[2.8rem] lg:text-[2.5rem] md:text-[2.3rem] sm:text-[2rem] md:max-w-[45rem] font-[800] pb-[0.3rem]"}>
            {data?.title}
          </h1>
        )}
        <h1 className={"md:max-w-[45rem] sm:max-w-[20rem] text[1.2rem] md:text-[1rem] sm:text-[0.9rem] md:line-clamp-none line-clamp-[9]"}>
          {data?.overview}
        </h1>
      </div>
      <div className="h-full w-full pointer-events-none bg-gradient-to-b from-transparent to-background"/>
    </header>
  )
}