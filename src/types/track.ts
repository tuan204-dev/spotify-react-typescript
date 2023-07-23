import { SpotifyAlbum } from "./album"
import { ArtistData } from "./artist"

export interface SongItemTagProps {
  thumbnailUrl?: string
  name?: string
  isLoading?: boolean
  id?: string
  setBgColor: React.Dispatch<React.SetStateAction<string>>
}

export interface SongItemProps {
  songName?: string
  artists?: ArtistData[]
  thumb?: string
  duration?: number
  order?: number
  isLoading?: boolean
  albumData?: SpotifyAlbum
  dateAdd?: string
  isExplicit?: boolean
  type?: 'default' | 'playlist' | 'album' | 'search' | 'artist'
  id?: string
}

export interface SongListProps {
  songList: SongItemProps[]
  pivotTop: number
  top: number
  isLoading?: boolean
  type?: 'default' | 'playlist' | 'album' | 'search' | 'artist'
}

export interface SpotifyTrack {
  album?: SpotifyAlbum
  artists?: ArtistData[]
  duration_ms?: number
  name?: string
  id?: string
}



// -----------Rapid----------

export interface RapidTrack {
  soundcloudTrack?: {
    audio?: {
      quality?: string
      url?: string
      durationMs?: number
      durationText?: string
    }[]
  }
}