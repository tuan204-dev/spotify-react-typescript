import { scopes } from '@/config/spotify'

export const END_POINT = 'https://accounts.spotify.com/authorize'
export const RESPONSE_TYPE = 'code'
export const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
export const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
export const SCOPE = scopes
export const REDIRECT_URI = `${window.location.origin}/`
export const refreshTokenDev = import.meta.env.VITE_REFRESH_TOKEN_DEV
