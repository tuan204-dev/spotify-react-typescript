import { spotifyApiClient } from './axiosClient'

export const getUserQueue = async () => {
  const { data } = await spotifyApiClient.get('me/player/queue')
  return data
}

export const handlePause = async () => {
  await spotifyApiClient.put(`me/player/pause`)
}

export const handlePlay = async () => {
  await spotifyApiClient.put(`me/player/play`)
}

export const getPlaybackState = async () => {
  const { data } = await spotifyApiClient.get('me/player')
  return data
}
