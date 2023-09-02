import Hero from "@/components/Home/Hero";
import ScrollHorizontal from "@/components/Home/ScrollHorizontal";
import {Metadata} from "next";
import Image from "next/image";

export const metadata : Metadata = {
  title: "Home"
}

export default function Home() {
  return (
    <>
      <Hero/>
      <ScrollHorizontal
        title={"Popular Movies"}
        endpoints={"/movie/popular?language=en-US&page=1"}
        type={"movie"}
      />
      <ScrollHorizontal
        title={"Top Rating Movies"}
        endpoints={"/movie/top_rated?language=en-US&page=1"}
        type={"movie"}
      />
      <ScrollHorizontal
        title={"Top Rating TV Shows"}
        endpoints={"/tv/top_rated?language=en-US&page=1"}
        type={"tv"}
      />
      {/*<ScrollHorizontal*/}
      {/*  title={"Continue Watching"}*/}
      {/*  endpoints={"/movie/upcoming?language=en-US&page=1"}*/}
      {/*  isLarge={true}*/}
      {/*/>*/}
    </>
  )
}
