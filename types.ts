export interface SearchBannerItem {
  title?: string
  imageUrl?: string
  bgColor?: string
}

export interface PlayListItem {
  title?: string
  imageUrl?: string
  author?: string
  id?: string
}

export interface ArtistItem {
  name?: string
  imageUrl?: string
  id?: string
}

export interface AlbumItem {
  title?: string
  imageUrl?: string
  id?: string
  author?: string
  dateTime?: string
}

export interface SectionItemI extends PlayListItem, ArtistItem, AlbumItem {
  isArtist?: boolean
  isLoading?: boolean
  columnWidth: number
  dataType?: string
}

export interface ArtistDataProps {
  name: string
  id: string
}