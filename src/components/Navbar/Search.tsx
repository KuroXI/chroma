import {useEffect, useState} from "react";
import { axiosTMDB} from "@/api/axios";
import {IMovie, IPerson, ISearchResult, IShow} from "@/types/Movie";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command";
import {DialogProps} from "@radix-ui/react-dialog";
import SearchMovie from "@/components/Search/SearchMovie";
import SearchShow from "@/components/Search/SearchShow";
import SearchPerson from "@/components/Search/SearchPerson";

export default function Search({...props} : DialogProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [movieList, setMovieList] = useState<IMovie[]>();
  const [showList, setShowList] = useState<IShow[]>();
  const [personList, setPersonList] = useState<IPerson[]>();

  useEffect(() => {
    if (!query) return;

    const timeOutId = setTimeout(() => {
      axiosTMDB.get(`/search/multi?query=${query}&include_adult=false&language=en-US&page=1`)
        .then(({ data }) => {
          setMovieList(data.results.filter((result : ISearchResult) => result.media_type === "movie" && result.poster_path !== null));
          setShowList(data.results.filter((result : ISearchResult) => result.media_type === "tv" && result.poster_path !== null));
          setPersonList(data.results.filter((result : ISearchResult) => result.media_type === "person" && result.profile_path !== null));
        })
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [query]);

  return (
    <>
      <Button
        variant="outline"
        className={cn("relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64")}
        onClick={() => setIsOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search...</span>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          value={query}
          placeholder="Search a movie, show or people..."
          onValueChange={(search) => setQuery(search)}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading={"Movie"}>
            {movieList && movieList.map((movie, index) => (
              <SearchMovie key={index} movie={movie} onIsOpen={setIsOpen}/>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={"Show"}>
            {showList && showList.map((show, index) => (
              <SearchShow key={index} show={show} onIsOpen={setIsOpen}/>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={"Movie"}>
            {personList && personList.map((person, index) => (
              <SearchPerson key={index} person={person} onIsOpen={setIsOpen}/>
            ))}
          </CommandGroup>
          {query && <CommandItem>View More</CommandItem>}
        </CommandList>
      </CommandDialog>
    </>
  )
}