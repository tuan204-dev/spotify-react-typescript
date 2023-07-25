import { countries } from '@/types/contries'
import { spotifyApiClient } from './axiosClient'

type SearchTypes =
  | 'all'
  | Array<'album' | 'artist' | 'playlist' | 'track' | 'show' | 'episode' | 'audiobook'>

interface SearchArgs {
  query: string
  types?: SearchTypes
  limit?: number
  market?: countries
}

const searchApi = async (params: Partial<SearchArgs>) => {
  const { query = '', types = 'all', limit = 10, market = 'VN' } = params
  let typesParam: string

  if (types === 'all') {
    typesParam = 'album%2Cplaylist%2Ctrack%2Cartist%2Cshow%2Cepisode%2Caudiobook'
  } else {
    typesParam = types.map((type) => encodeURIComponent(type)).join('%2C')
  }

  const { data } = await spotifyApiClient('search', {
    params: {
      q: encodeURIComponent(query),
      type: typesParam,
      market: market,
      limit: limit,
    },
  })

  return data
}

export default searchApi
