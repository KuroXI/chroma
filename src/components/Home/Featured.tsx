import FeaturedRow from "@/components/Home/FeaturedRow";

export default function Featured() {
  return (
    <section className={"grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 p-5"}>
      <FeaturedRow title={"Trending"} sort={"TRENDING_DESC"} />
      <FeaturedRow title={"Popular"} sort={"POPULARITY_DESC"} />
      <FeaturedRow title={"Recent Update"} sort={"UPDATED_AT_DESC"} />
    </section>
  )
}