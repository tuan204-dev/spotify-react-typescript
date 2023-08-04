import { ArtistData } from "./artist"

export interface ImageSource {
  url: string
  width: number
  height: number
}

export interface ColorRaw {
  hex: string
}

export interface ExtractedColors {
  colorRaw: ColorRaw
}

export interface GalleryItem {
  sources: ImageSource[]
}

export interface Gallery {
  items: GalleryItem[]
}

export interface AvatarImage {
  sources: ImageSource[]
  extractedColors: ExtractedColors
}

export interface HeaderImage {
  sources: ImageSource[]
  extractedColors: ExtractedColors
}

export interface HeaderProps {
  title?: string
  thumbnail?: string
  quantity?: number
  type?: 'Playlist' | 'album' | 'single' | 'compilation' | 'podcast' | 'episode'
  bgColor?: string
  desc?: string
  isLoading?: boolean
  artists?: ArtistData[]
  releaseDate?: string
  isWhiteColor?: boolean
  headerType?: 'playlist' | 'album' | 'show' | 'genre'
  publisher?: string
  showName?: string
  showId?: string
}
