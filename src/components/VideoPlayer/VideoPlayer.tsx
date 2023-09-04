import {IVideo} from "@/types/Movie";
import {MediaCommunitySkin, MediaOutlet, MediaPlayer} from "@vidstack/react";
import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";
import {proxyM3U8} from "@/lib/utils";

export default function VideoPlayer(video : IVideo) {
  return video && (
    <MediaPlayer aspectRatio={16 / 9} load={"idle"} crossorigin={"anonymous"}>
      <MediaOutlet className={"relative"}>
        <source
          src={proxyM3U8(video.sources.find((source) => source.quality === "auto")?.url)}
          type={"application/x-mpegurl"}
        />
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