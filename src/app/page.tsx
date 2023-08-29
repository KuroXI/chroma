import Hero from "@/components/Home/Hero";
import ScrollHorizontal from "@/components/Home/ScrollHorizontal";

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
      {/*<ScrollHorizontal*/}
      {/*  title={"Continue Watching"}*/}
      {/*  endpoints={"/movie/upcoming?language=en-US&page=1"}*/}
      {/*  isLarge={true}*/}
      {/*/>*/}
    </>
  )
}
