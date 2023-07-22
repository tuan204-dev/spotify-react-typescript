import axios from 'axios'
import queryString from 'query-string'
import { getAccessToken } from './getAccessToken'

const getAccessTokenDev = async () => {
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
  const token = await getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const spotifyApiClientDev = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  paramsSerializer: (params) => queryString.stringify(params, { encode: false }),
})

spotifyApiClientDev.interceptors.request.use(async (config) => {
  const token = await getAccessTokenDev()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

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
