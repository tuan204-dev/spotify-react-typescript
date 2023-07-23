import { countries } from "./contries"

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
