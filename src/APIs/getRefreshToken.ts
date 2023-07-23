import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '@/constants/auth'
import axios from 'axios'

export const getRefreshToken = async () => {
  const authCode = localStorage.getItem('spotify_auth_code')

  const params = new URLSearchParams()
  params.append('grant_type', 'authorization_code')
  params.append('code', authCode as string)
  params.append('redirect_uri', REDIRECT_URI)
  params.append('client_id', CLIENT_ID)
  params.append('client_secret', CLIENT_SECRET)

  const { data } = await axios.post('https://accounts.spotify.com/api/token', params)

  if (!data?.refresh_token)
    return {
      status: false,
    }

  const currentTime = new Date()

  localStorage.setItem('spotify_refresh_token', data.refresh_token)
  localStorage.setItem('spotify_access_token', data.access_token)
  localStorage.setItem('spotify_access_token_at', JSON.stringify(currentTime))
  return {
    status: true,
  }
}

