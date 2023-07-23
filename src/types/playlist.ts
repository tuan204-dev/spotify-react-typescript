import { ImageSource } from './others'

export interface PlayListItem {
  title?: string
  imageUrl?: string
  author?: string
  id?: string
  name?: string
  description?: string
  images?: ImageSource[]
}
