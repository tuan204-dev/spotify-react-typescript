import { countries } from '@/types/countries'
import { spotifyApiDev } from './axiosClient'

interface browserApiProps {
  limit: number
  country: countries
  type: 'featured-playlists' | 'new-releases'
}

const browserApi = async (params: Partial<browserApiProps>) => {
  const { country, limit, type } = params

  const { data } = await spotifyApiDev.get(`browse/${type}`, {
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
