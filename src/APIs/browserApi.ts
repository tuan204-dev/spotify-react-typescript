import { countries } from '@/types/contries'
import { spotifyApiClient } from './axiosClient'

interface browserApiProps {
  limit: number
  country: countries
  type: 'featured-playlists' | 'new-releases'
}

const browserApi = async (params: Partial<browserApiProps>) => {
  const { country, limit, type } = params

  const { data } = await spotifyApiClient.get(`browse/${type}`, {
    params: {
      country: country,
      limit: limit,
    },
  })

  if (data?.albums) {
    return data.albums.items
  }

  if (data?.playlists) {
    return data.playlists.items
  }
}

export default browserApi
