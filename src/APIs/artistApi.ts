import { rapidApiClient, spotifyApiClient } from './axiosClient'

const artistApi = async (id: string | undefined) => {
  if (!id) return
  const { data } = await rapidApiClient.get('artist_overview/', {
    params: {
      id: id,
    },
  })

  return data.data.artist
}

export const getArtistTopTrack = async (id: string | undefined) => {
  if (!id) return
  const { data } = await spotifyApiClient.get(`artists/${id}/top-tracks?market=VN`)
  return data
}

export default artistApi
