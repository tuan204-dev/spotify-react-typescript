import { scopes } from '@/config/spotify'

export const END_POINT = 'https://accounts.spotify.com/authorize'
export const RESPONSE_TYPE = 'code'
export const SCOPE = scopes
export const REDIRECT_URI = `${window.location.origin}/`
