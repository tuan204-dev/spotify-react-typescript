import { spotifyApiClient, spotifyApiClientDev } from './axiosClient'

export const getUserData = async () => {
  const { data } = await spotifyApiClient.get(`me`)
  return data
}

export const getUserPlaylist = async (id: string) => {
  const { data } = await spotifyApiClientDev.get(`users/${id}/playlists`, {
    params: {
      limit: 50,
    },
  })
  return data
}

export const getUserAlbum = async () => {
  const { data } = await spotifyApiClient.get('me/albums', {
    params: {
      limit: 50,
    },
  })
  return data
}

export const getUserTopArtists = async () => {
  const { data } = await spotifyApiClientDev.get('me/top/artists', {
    params: {
      limit: 50,
    },
  })
  return data
}
