export interface IResult<T> extends IMeta {
  results: T[]
}

export interface IInfo {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface IMeta {
  page: number
  total_pages: number
  total_results: number
}

export interface ILogo {
  aspect_ratio: number
  height: number
  iso_639_1: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface IMovieInfo {
  id: string
  title: string
  episodeId: string
  translations: Translation[]
  image: string
  cover: string
  logos: Logo[]
  type: string
  rating: number
  releaseDate: string
  description: string
  genres: string[]
  duration: number
  directors: string[]
  writers: string[]
  actors: string[]
  trailer: Trailer
  mappings: Mappings
  similar: Similar[]
  recommendations: Recommendation[]
}

export interface Translation {
  title?: string
  description?: string
  language: string
}

export interface Logo {
  url: string
  aspectRatio: number
  width: number
}

export interface Trailer {
  id: string
  site: string
  url: string
}

export interface Mappings {
  imdb: string
  tmdb: number
}

export interface Similar {
  id: number
  title: string
  image: string
  type: string
  rating: number
  releaseDate: string
}

export interface Recommendation {
  id: number
  title: string
  image: string
  type: string
  rating: number
  releaseDate: string
}

export interface IVideo {
  headers: IVideoHeaders
  sources: IVideoSource[]
  subtitles: IVideoSubtitle[]
}

export interface IVideoHeaders {
  Referer: string
}

export interface IVideoSource {
  url: string
  isM3U8: boolean
  quality: string
}

export interface IVideoSubtitle {
  url: string
  lang: string
}