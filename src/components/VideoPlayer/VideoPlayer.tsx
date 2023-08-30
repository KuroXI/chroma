import {IVideo} from "@/types/Movie";
import {MediaCommunitySkin, MediaOutlet, MediaPlayer} from "@vidstack/react";
import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";

export default function VideoPlayer(video : IVideo) {
  return video && (
    <MediaPlayer
      src={video.sources.find((source) => source.quality === "auto")?.url}
      aspectRatio={16 / 9}
      crossorigin={"anonymous"}
    >
      <MediaOutlet className={"relative"}>
        {video.subtitles.map((subtitle, index) => (
          <track
            key={index}
            src={subtitle.url}
            kind={"subtitles"}
            srcLang={subtitle.lang}
            label={subtitle.lang}
            default={subtitle.lang.includes("English")}
          />
        ))}
      </MediaOutlet>
      <MediaCommunitySkin/>
    </MediaPlayer>
  )
}