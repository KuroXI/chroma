export interface IResult<Manga> extends IMeta {
  results: Manga[]
}

export interface IManga {
  id: string
  malId: number
  title: ITitle
  status: string
  image: string
  cover: string
  chapters: IChapter[]
  popularity: number
  totalEpisodes: number | null
  currentEpisode: number | null
  countryOfOrigin: string
  description: string
  genres: string[]
  rating: number
  color: string
  type: string
  releaseDate: string | null
}

export interface IChapter {
  id: string
  chapter: string
  title: string | null
}

export interface IMeta {
  currentPage: number
  hasNextPage: boolean
  totalPages: number
  totalResults: number
}

export interface ITitle {
  romaji: string | null
  english: string | null
  native: string | null
  userPreferred: string | null
}