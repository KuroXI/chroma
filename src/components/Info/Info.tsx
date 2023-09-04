import Image from "next/image";
import {IMovieInfo, ISeasonInfo} from "@/types/Movie";
import {proxyImage} from "@/lib/utils";

export default function Info(data: IMovieInfo | ISeasonInfo) {
  return (
    <div className={"flex md:flex-row flex-col md:items-end items-center gap-4"}>
      <div className={"md:mx-0 mx-auto"}>
        <Image
          src={proxyImage(data?.image)}
          alt={"image"}
          width="0"
          height="0"
          sizes="200px"
          className={"w-auto h-auto min-w-[200px] min-h-[200px] max-h-[300px] rounded-md md:block hidden"}
        />
      </div>
      <div className={"mb-10"}>
        { data.logos.length ? (
          <Image
            src={proxyImage(data.logos[0].url)}
            alt={data.title}
            width="0"
            height="0"
            sizes="(min-width: 420px) 389px, calc(89vw + 33px)"
            className={"w-auto h-full max-h-[120px] mx-auto md:mx-0"}
          />
        ) : (
          <h1 className={"xl:text-[2.8rem] lg:text-[2.5rem] md:text-[2.3rem] sm:text-[2rem] md:max-w-[45rem] font-[800]"}>
            {data.title}
          </h1>
        )}
        <div className={"flex flex-col my-4 text-muted-foreground"}>
          <h1>Release Date: <span className={"text-foreground"}>{data.releaseDate}</span></h1>
          <h1>Duration: <span className={"text-foreground"}>{data.duration} minutes</span></h1>
          <h1>Directors: <span className={"text-foreground"}>{data.directors}</span></h1>
        </div>
        <h1 className={"text-md max-w-3xl md:line-clamp-6"}>
          {data.description}
        </h1>
      </div>
    </div>
  )
}