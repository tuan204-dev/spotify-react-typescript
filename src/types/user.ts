import { countries } from './countries'
import { ImageSource } from './others'

export interface UserData {
  display_name?: string
  id?: string
  images?: ImageSource[]
  email?: string
  country?: countries
  followers?: { total?: number }
}
