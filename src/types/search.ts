export interface SearchBannerItem {
  title?: string
  imgUrl?: string
  id?: string
  bgColor?: string
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
