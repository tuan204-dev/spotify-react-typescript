import { spotifyApiClient } from './axiosClient'

export const getUserQueue = async () => {
  const { data } = await spotifyApiClient.get('me/player/queue')
  return data
}

export const pauseApi = async () => {
  await spotifyApiClient.put(`me/player/pause`)
}

export const getPlaybackState = async () => {
  const { data } = await spotifyApiClient.get('me/player')
  return data
}
