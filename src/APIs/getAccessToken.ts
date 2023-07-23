import { CLIENT_ID, CLIENT_SECRET, refreshTokenDev } from '@/constants/auth'
import axios from 'axios'
import { handleRefreshToken } from './handleRefreshToken'

export const getAccessToken = async () => {
  const accessTokenAt = new Date(
    JSON.parse(localStorage.getItem('spotify_access_token_at') as string)
  ).getTime()
  const currentTime = new Date()

  if (currentTime.getTime() - accessTokenAt < 3600000) {
    return localStorage.getItem('spotify_access_token')
  } else {
    return await handleRefreshToken()
  }
}

export const getAccessTokenDev = async () => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
  }

  const params = new URLSearchParams()
  params.append('grant_type', 'refresh_token')
  params.append('refresh_token', refreshTokenDev as string)
  const url = 'https://accounts.spotify.com/api/token'

  const { data } = await axios.post(url, params, { headers })

  return data.access_token
}
