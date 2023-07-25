import { countries } from '@/types/contries'
import axios from 'axios'
import { spotifyApiClient } from './axiosClient'

interface GetTrackParams {
  id: string
}

export const getTrack = async (params: GetTrackParams) => {
  const { id } = params

  const { data } = await spotifyApiClient.get(`tracks/${id}`)

  return data
}

interface getTrackRecommendationParams {
  limit?: number
  market?: countries
  seed_artists: string
  seed_tracks?: string
}

export const getTrackRecommendation = async (params: getTrackRecommendationParams) => {
  const { limit = 5, market = 'VN', seed_artists, seed_tracks } = params
  const { data } = await spotifyApiClient.get('recommendations', {
    params: {
      limit,
      market,
      seed_artists,
      seed_tracks,
    },
  })

  return data.tracks
}

interface GetAudioTrackParams {
  id?: string
}

export const getAudioTrack = async ({ id }: GetAudioTrackParams) => {
  if (!id) return
  const apiKey = import.meta.env.VITE_RAPID_SOUNDCLOUD_API

  const options = {
    method: 'GET',
    url: 'https://spotify-scraper.p.rapidapi.com/v1/track/download/soundcloud',
    params: {
      track: id,
      quality: 'hq',
    },
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com',
    },
  }

  const { data } = await axios.request(options)
  return data
}
