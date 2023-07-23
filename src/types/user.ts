import { countries } from './contries'
import { ImageSource } from './orther'

export interface UserData {
  display_name?: string
  id?: string
  images?: ImageSource[]
  email?: string
  country?: countries
  followers?: { total?: number }
}
