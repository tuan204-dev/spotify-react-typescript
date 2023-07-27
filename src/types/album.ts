import { ArtistData } from './artist'
import { ImageSource } from './others'
import { SpotifyTrack } from './track'

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
  images?: ImageSource[]
  id?: string
  name?: string
  album_type?: 'album' | 'Playlist' | 'single' | 'compilation' | 'podcast' | 'episode'

  release_date?: string
  description?: string
  tracks?: {
    total?: number
    items: SpotifyTrack[]
  }
  copyrights?: {
    text?: string
    type?: string
  }[]
}
