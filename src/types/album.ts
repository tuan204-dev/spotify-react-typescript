import { ArtistData } from './artist'
import { ImageSource } from './others'

export interface AlbumItem {
  title?: string
  imageUrl?: string
  id?: string
  author?: string
  dateTime?: string
  album?: {
    id?: string
    images?: ImageSource[]
    name?: string
    artists?: ArtistData[]
  }
}

export interface SpotifyAlbum {
  artists?: ArtistData[]
  images?: { url?: string }[]
  id?: string
  name?: string
}
