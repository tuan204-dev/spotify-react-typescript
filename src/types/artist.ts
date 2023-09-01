import { ExtractedColors, Gallery, HeaderImage, ImageSource } from './others'

export interface ArtistData {
  name: string
  id: string
}

export interface ArtistItem {
  name?: string
  imageUrl?: string
  id?: string
  images?: ImageSource[]
}

export interface ArtistProfile {
  id: string | undefined
  name: string | undefined
  bio: string | undefined
  isVerified: boolean | undefined
  biography?: { text: string }
}

export interface ArtistTopCity {
  city: string
  country: string
  numberOfListeners: number
  region: string
}

export interface ArtistStats {
  followers: number
  monthlyListeners: number
  topCities: { items: ArtistTopCity[] }
}

interface AvatarImage {
  sources: ImageSource[]
  extractedColors: ExtractedColors
}

export interface Visuals {
  avatarImage: AvatarImage
  gallery: Gallery
  headerImage: HeaderImage
}

export interface ExternalLink {
  name: string
  url: string
}
