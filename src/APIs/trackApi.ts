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
  const { limit = 19, market = 'VN', seed_artists, seed_tracks } = params
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

const ytSearch = async (query: string) => {
  const options = {
    method: 'GET',
    url: 'https://fastytapi.p.rapidapi.com/ytapi/search',
    params: {
      query: `${query}`,
      resultsType: 'video',
      sortBy: 'relevance',
      geo: 'GB',
    },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_RAPID_YOUTUBE_SEARCH,
      'X-RapidAPI-Host': 'fastytapi.p.rapidapi.com',
    },
  }

  const { data } = await axios.request(options)
  console.log(`${query}`)

  return data.data.find((item: any) => item.lengthSeconds < 600).videoId
}

export const getAudioTrack = async (query: string) => {
  const id = await ytSearch(query)
  const options = {
    method: 'GET',
    url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
    params: { id },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_RAPID_YOUTUBE_AUDIO,
      'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com',
    },
  }
  const { data } = await axios.request(options)
  const returnData = data.adaptiveFormats
    .filter((item: any) => item.mimeType.includes('audio'))
    .sort((a: any, b: any) => -a.bitrate + b.bitrate)[0]

  return {
    audioLink: returnData.url,
    durationMs: Number(returnData.approxDurationMs),
  }
}
