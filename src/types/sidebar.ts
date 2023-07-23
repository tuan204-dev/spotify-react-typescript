import { ArtistData } from "./artist"

export type LibSelection = {
  title: string
  id: string
  type: 'playlist' | 'album' | 'artist'
  active: boolean
}

export interface ResponseLibItem {
  id?: string
  owner?: {
    display_name?: string
  }
  artists?: ArtistData[]
  name?: string
  images?: {
    url?: string
  }[]
}
