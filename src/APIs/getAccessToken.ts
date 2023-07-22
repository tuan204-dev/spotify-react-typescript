export const getAccessToken = async () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
  const refreshToken = localStorage.getItem('spotify_refresh_token')
  if (refreshToken && refreshToken !== 'undefined') {
    const accessTokenAt = new Date(
      JSON.parse(localStorage.getItem('spotify_access_token_at') as string)
    ).getTime()
    const currentTime = new Date()

    if (currentTime.getTime() - accessTokenAt < 3600000) {
      return localStorage.getItem('spotify_access_token')
    } else {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
        },
        body: 'grant_type=refresh_token&refresh_token=' + refreshToken,
      })
      const data = await response.json()
      const accessToken = data.access_token
      localStorage.setItem('spotify_access_token', JSON.stringify(accessToken))
      localStorage.setItem('spotify_access_token_at', JSON.stringify(currentTime))
      return accessToken
    }
  } else {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    })
    const data = await response.json()
    return data.access_token
  }
}

export const getAccessTokenDev = async () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
  const refreshTokenDev = import.meta.env.VITE_REFRESH_TOKEN_DEV
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
    },
    body: 'grant_type=refresh_token&refresh_token=' + refreshTokenDev,
  })
  const data = await response.json()
  return data.access_token
}
