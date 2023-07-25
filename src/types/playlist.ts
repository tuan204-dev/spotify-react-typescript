import { ImageSource } from './others'
import { SpotifyTrack } from './track'

export interface PlayListItem {
  title?: string
  imageUrl?: string
  author?: string
  id?: string
  name?: string
  description?: string
  images?: ImageSource[]
}

export interface PlaylistData {
  description?: string
  id?: string
  name?: string
  images?: ImageSource[]
  owner?: {
    display_name?: string
    id?: string
  }
  tracks?: {
    items?: { track: SpotifyTrack }[]
    total?: number
  }
}
