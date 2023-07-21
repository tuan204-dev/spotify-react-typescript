import axios from 'axios'
import queryString from 'query-string'

const getAccessToken = async () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

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

export const spotifyApiClient = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  paramsSerializer: (params) => queryString.stringify(params, { encode: false }),
})

spotifyApiClient.interceptors.request.use(async (config) => {
  // const token = await getAccessToken()
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`
  // }

  config.headers.Authorization = `Bearer BQArs_1Me8L8M0XXijyi-_V4Z68JWzPfkqPxED7luif3IKSGqJ2T9uul8wjlurdsWD5HhybU3iupwYSDS1ZVMFC3PqIXnP7JvIyU7Ybejn-65KLn2Kyv8x5onoHjS4HA7kr4LVKrIUL5AtkXgMlaoc7NBrooQ0XmVa2c8UgWr73eKIMSzy06KIjmgZi39LmMydCXpek4FRc54VdFiSDAIC9SKNeFHV2PWKK-FvAkzds0C6ShcE38uZ9G6UDvmX1vjXwUERewiuM_7OgT4h_7mWeG43ukud9bbBucNlC4Na8teDjdHuMT3YLNrPkUGj4UDDezccRdJJAxFESqQr874Tud`

  return config
})

export const rapidApiClient = axios.create({
  baseURL: 'https://spotify23.p.rapidapi.com',
  paramsSerializer: (params) => queryString.stringify(params, { encode: false }),
})

rapidApiClient.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_RAPID_SPOTIFY_API

  config.headers['X-RapidAPI-Key'] = apiKey
  config.headers['X-RapidAPI-Host'] = 'spotify23.p.rapidapi.com'

  return config
})
