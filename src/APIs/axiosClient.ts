import axios from 'axios'
import queryString from 'query-string'
import { getAccessToken, getAccessTokenDev } from './getAccessToken'

export const spotifyApiClient = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  paramsSerializer: (params) => queryString.stringify(params, { encode: false }),
})

spotifyApiClient.interceptors.request.use(async (config) => {
  config.headers['Content-Type'] = 'application/json'
  const isLogged = Boolean(localStorage.getItem('spotify_refresh_token'))

  if (isLogged) {
    const token = await getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } else {
    const tokenDev = await getAccessTokenDev()
    config.headers.Authorization = `Bearer ${tokenDev}`
  }

  return config
})

//to get artists data
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

// youtube search
// export const youtubeApiClient = axios.create({
//   baseURL: 'https://youtube.googleapis.com/youtube/v3',
//   paramsSerializer: (params) => queryString.stringify(params, { encode: true }),
// })

//rapidApi - Youtube search https://rapidapi.com/fama-official-fastytapi/api/fastytapi/
// export const rapidYtSearchClient = axios.create({
//   baseURL: 'https://fastytapi.p.rapidapi.com/ytapi',
//   paramsSerializer: (params) => queryString.stringify(params, { encode: true }),
// })

// rapidYtSearchClient.interceptors.request.use((config) => {
//   const apiKey = import.meta.env.VITE_RAPID_YOUTUBE_SEARCH

//   config.headers['X-RapidAPI-Key'] = apiKey
//   config.headers['X-RapidAPI-Host'] = 'fastytapi.p.rapidapi.com'

//   return config
// })
