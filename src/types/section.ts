import { AlbumItem } from './album'
import { ArtistData, ArtistItem, Visuals } from './artist'
import { ImageSource } from './others'
import { PlayListItem } from './playlist'

export interface SectionItemI extends PlayListItem, ArtistItem, AlbumItem {
  isArtist?: boolean
  isLoading?: boolean
  columnWidth?: number
  dataType?: string
  artists?: ArtistData[]
  desc?: string
  publisher?: string
  dateAdd?: string
  type?: 'default' | 'playlist' | 'album' | 'artistList' | 'artist' | 'show'
}

export interface SectionProps {
  title?: string
  href?: string
  data?: ResponseSectionItem[]
  dataType?: string
  isFull?: boolean
  isClickable?: boolean
  hideHeader?: boolean
  type?: 'default' | 'playlist' | 'album' | 'artistList' | 'artist' | 'show'
  apiType?: 'spotify' | 'rapid'
  pageType?: 'section' | 'genre'
}

export interface ResponseSectionItem {
  id?: string
  name?: string
  images: ImageSource[] | any
  publisher?: string
  artists?: ArtistData[]
  description?: string
  owner?: {
    display_name: string
  }
  release_date?: string
  uri?: string
  visuals?: Visuals
  profile?: any
  releases?: any
  coverArt?: any
  date?: any
  albumId?: string
}
