"use client";

import {ISeason} from "@/types/Movie";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {EpisodeList} from "@/components/Season/EpisodeList";

interface SeasonTabsProps {
  seasons: ISeason[]
}

export default function SeasonTabs({ seasons } : SeasonTabsProps) {
  const [episodeList, setEpisodeList] = useState<ISeason>();
  const [selectedSeason, setSelectedSeason] = useState(1);

  useEffect(() => {
    setEpisodeList(seasons.find((season) => season.season === selectedSeason));
  }, [seasons, selectedSeason]);

  return (
    <div className={"w-full"}>
      <div className={"flex items-center justify-start py-4"}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Seasons {selectedSeason} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {seasons.map((season, index) => (
              <DropdownMenuCheckboxItem key={index} onClick={() => setSelectedSeason(season.season)}>
                Season {season.season}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <EpisodeList episode={episodeList?.episodes || []}/>
    </div>
  )
}