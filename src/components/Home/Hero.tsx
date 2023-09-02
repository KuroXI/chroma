"use client";

import {useEffect, useState} from "react";
import {axiosTMDB} from "@/api/axios";
import {parseImage} from "@/lib/utils";
import {IInfo, ILogo} from "@/types/Movie";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {PlayCircle} from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const [data, setData] = useState<IInfo>();
  const [logo, setLogo] = useState<ILogo>();

  useEffect(() => {
    axiosTMDB.get(`/movie/popular?language=en-US&page=1`).then(({ data }) => {
      const random = Math.floor(Math.random() * data.results.length)
      const selectedResult = data.results[random]

      axiosTMDB.get(`/movie/${selectedResult.id}/images`).then((response) => {
        const { logos } = response.data;

        (logos.filter((logo : ILogo) => logo.iso_639_1 === "en").length)
          ? setLogo(logos.filter((logo : ILogo) => logo.iso_639_1 === "en")[0])
          : setLogo(logos[0])
      });

      setData(selectedResult);
    })
  }, []);

  return data && (
    <header
      className={"relative h-[80vw] min-h-[350px] max-h-[550px] object-contain bg-background"}
      style={{
        backgroundImage: `url(${parseImage(data.backdrop_path)})`,
        backgroundSize: "cover",
        backgroundPosition: "top center"
      }}
    >
      <div className={"absolute md:mx-20 mx-5 top-[20%]"}>
        { logo?.file_path ? (
          <Image
            src={parseImage(logo.file_path)}
            alt={logo.file_path!}
            width="0"
            height="0"
            sizes="100vw"
            className={"w-auto h-[20vw] min-h-[90px] max-h-[120px] md:max-w-2xl max-w-screen"}
          />
        ) : (
          <h1 className={"xl:text-[2.8rem] lg:text-[2.5rem] md:text-[2.3rem] sm:text-[2rem] md:max-w-[45rem] font-[800]"}>
            {data.title}
          </h1>
        )}
        <h1 className={"max-w-2xl md:text-md text-sm md:line-clamp-none line-clamp-3 mt-5"}>
          {data.overview}
        </h1>
        <div className={"mt-5"}>
          <Button className={"font-[700]"} asChild>
            <Link href={`/movie/${data.id}`}>
              <PlayCircle className={"mr-2"}/>
              Play Now
            </Link>
          </Button>
        </div>
      </div>
      <div className="h-full w-full pointer-events-none bg-gradient-to-b from-transparent to-background"/>
    </header>
  )
}