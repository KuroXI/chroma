import FeaturedRow from "@/components/Home/FeaturedRow";

export default function Featured() {
  return (
    <section className={"text-white grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-10 p-5"}>
      <FeaturedRow title={"TRENDING"} sort={"TRENDING_DESC"} />
      <FeaturedRow title={"POPULAR"} sort={"POPULARITY_DESC"} />
      <FeaturedRow title={"LATEST UPDATE"} sort={"UPDATED_AT_DESC"} />
      <FeaturedRow title={"TOP AIRING"} sort={"FAVOURITES_DESC"} />
    </section>
  )
}