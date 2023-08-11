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
  limit?: number
  offset?: number
}

export const getCategoryPlaylist = async (params: getCategoryPlaylistProps) => {
  const { id, limit = 50, offset = 0 } = params
  if (!id) return

  const { data } = await spotifyApiDev.get(`browse/categories/${id}/playlists`, {
    params: {
      limit,
      country: 'VN',
      offset,
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
