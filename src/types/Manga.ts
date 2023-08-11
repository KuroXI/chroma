export type MangaReturnData = {
  currentPage: number
  hasNextPage: boolean
  totalPages: number
  totalResults: number
  results: MangaResult[]
}

export type MangaResult = {
  id: string
  malId: number
  title: Title
  status: string
  image: string
  cover: string
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

export type Title = {
  romaji: string
  english: string
  native: string
  userPreferred: string
}