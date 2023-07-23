import { ArtistData } from "./artist"

export interface AlbumItem {
  title?: string
  imageUrl?: string
  id?: string
  author?: string
  dateTime?: string
}

export interface SpotifyAlbum {
  artists?: ArtistData[]
  images?: { url?: string }[]
  id?: string
  name?: string
}
