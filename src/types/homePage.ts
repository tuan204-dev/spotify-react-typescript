import { countries } from "./countries"

export interface NewReleasesArgs {
  accessToken: string
  limit: number
  country: countries
}

export interface FeaturedPlaylistsProps {
  limit: number
  accessToken: string
  country: countries
}
