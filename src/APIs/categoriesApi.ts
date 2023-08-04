import { spotifyApiDev } from './axiosClient'

export const getCategories = async () => {
  const { data } = await spotifyApiDev.get('browse/categories', {
    params: {
      country: 'VN',
      limit: 50,
    },
  })

  return data
}

interface getCategoryPlaylistProps {
  id?: string
}

export const getCategoryPlaylist = async (params: getCategoryPlaylistProps) => {
  const { id } = params
  if (!id) return

  const { data } = await spotifyApiDev.get(`browse/categories/${id}/playlists`, {
    params: {
      limit: 50,
      country: 'VN',
    },
  })

  return data
}

export const getCategoryInfo = async (params: getCategoryPlaylistProps) => {
  const { id } = params
  if (!id) return

  const { data } = await spotifyApiDev.get(`browse/categories/${id}`)
  
  return data
}
