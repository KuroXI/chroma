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
  season?: ISeason[]
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

export interface ISeasonInfo extends IMovieInfo {
  totalEpisodes: number
  totalSeasons: number
  seasons: ISeason[]
}

export interface ISeason {
  season: number
  image: ISeasonImage
  episodes: ISeasonEpisode[]
  isReleased: boolean
}

export interface ISeasonImage {
  hd: string
  mobile: string
}

export interface ISeasonEpisode {
  id: string
  title: string
  episode: number
  season: number
  releaseDate: string
  description: string
  url: string
  img: ISeasonImage
}

export interface ISearch extends IMeta {
  results: ISearchResult[]
}

export type ISearchResult = {
  adult: boolean
  id: number
  popularity: number
} & ({
  media_type: "movie"
  backdrop_path?: string
  title?: string
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  genre_ids: string[]
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}) | ({
  media_type: "tv"
  name: string
  original_language: string
  original_name: string
  overview: string
  poster_path: string
  genre_ids: string[]
  first_air_date: string
  vote_average: number
  vote_count: number
  origin_country: string[]
}) | ({
  media_type: "person"
  name: string
  original_name: string
  gender: number
  known_for_department: string
  profile_path: string
  known_for: KnownFor[]
});

export interface IMovie {
  adult: boolean
  backdrop_path?: string
  id: number
  title: string
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface IShow {
  adult: boolean
  backdrop_path: string
  id: number
  name: string
  original_language: string
  original_name: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  first_air_date: string
  vote_average: number
  vote_count: number
  origin_country: string[]
}

export interface IPerson {
  adult: boolean
  id: number
  name: string
  original_name: string
  media_type: string
  popularity: number
  gender: number
  known_for_department: string
  profile_path: string
  known_for: KnownFor[]
}

export type KnownFor = {
  adult: boolean
  id: number
  title: string
  original_language: string
  overview: string
  poster_path: string
  genre_ids: number[]
  popularity: number
  video: boolean
  vote_average: number
  vote_count: number
} & ({
  media_type: "movie"
  backdrop_path?: string
  title?: string
  original_title: string
  release_date: string
  video: boolean
}) & ({
  media_type: "tv"
  name: string
  original_name: string
  first_air_date: string
  origin_country: string[]
})
