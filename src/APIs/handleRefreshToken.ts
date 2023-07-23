import axios from 'axios'

export const handleRefreshToken = async () => {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
  const refreshToken = localStorage.getItem('spotify_refresh_token')
  const url = 'https://accounts.spotify.com/api/token'
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
  }
  const params = new URLSearchParams()
  params.append('grant_type', 'refresh_token')
  params.append('refresh_token', refreshToken as string)

  const { data } = await axios.post(url, params, { headers })

  const currentTime = new Date()

  localStorage.setItem('spotify_access_token', data.access_token)
  localStorage.setItem('spotify_access_token_at', JSON.stringify(currentTime))
  return data.access_token
}
