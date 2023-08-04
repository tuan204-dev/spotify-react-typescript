export interface SearchBannerItem {
  title?: string
  imageUrl?: string
  id?: string
}

export interface CategoryItem {
  icons: {
    height: number
    width: number
    url: string
  }[]
  id: string
  name: string
}
