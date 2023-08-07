import { countries } from '@/types/countries'
import { spotifyApiDev } from './axiosClient'

interface GetTrackParams {
  id: string
}

export const getTrack = async (params: GetTrackParams) => {
  const { id } = params

  const { data } = await spotifyApiDev.get(`tracks/${id}`)

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
  const { data } = await spotifyApiDev.get('recommendations', {
    params: {
      limit,
      market,
      seed_artists,
      seed_tracks,
    },
  })

  return data.tracks
}
