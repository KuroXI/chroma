import {ISeasonEpisode} from "@/types/Movie";

interface CardHorizontalProps {
  episode: ISeasonEpisode
  onClick: () => void
}

export default function CardHorizontal({ episode, onClick } : CardHorizontalProps) {
  return (
    <div
      onClick={onClick}
      className={"relative max-w-[400px] max-h-[250px] min-w-[150px] min-h-[200px] w-full h-auto inline-block overflow-hidden mr-2 rounded-md"}
      style={{
        backgroundImage: `url(${episode.img.hd.replace('/w780/', '/original/')})`,
        backgroundSize: "cover",
        backgroundPosition: "top center"
      }}
    >
      <div className="absolute h-full w-full pointer-events-none bg-gradient-to-b from-transparent to-background"/>
      <div className={"absolute items-end bottom-0"}>
        <h1 className={"text-3xl font-bold"}>{episode.title}</h1>
        <h1 className={"text-muted-foreground"}>Episode {episode.episode}</h1>
        <h1 className={"text-muted-foreground line-clamp-2"}>{episode.description}</h1>
      </div>
    </div>
    // <div
    //   className={"relative inline-block w-full overflow-hidden h-auto object-contain bg-background bg-cover bg-top"}
    //   style={{ backgroundImage: `url(${episode.img.hd.replace('/w780/', '/original/')})` }}
    // >
    //
    // </div>
  )
}