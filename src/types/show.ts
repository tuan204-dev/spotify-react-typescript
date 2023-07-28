import { ImageSource } from './others'

export interface ShowItem {
  description?: string
  html_description?: string
  duration_ms?: number
  explicit?: boolean
  id?: string
  images?: ImageSource[]
  name?: string
  release_date?: string
  type?: string
}

export interface ShowData {
  description?: string
  html_description?: string
  episodes?: {
    items?: ShowItem[]
  }
  explicit?: boolean
  id?: string
  images?: ImageSource[]
  name?: string
  publisher?: string
  total_episodes?: number
}

export interface Episode extends ShowItem {
  show?: {
    id?: string
    images?: ImageSource[]
    name?: string
    publisher?: string
  }
}

export interface Episode extends ShowItem {
  show?: {
    id?: string
    images?: ImageSource[]
    name?: string
    publisher?: string
  }
}
