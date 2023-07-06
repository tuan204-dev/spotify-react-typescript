import {
  FeaturedPlaylistsProps,
  NewReleasesArgs,
  RequestArg,
  countries,
} from '../../types'

export const getAccessToken = async () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
  })

  const data = await response.json()
  return data.access_token
}

export const fetchSpotifyData = async (args: Partial<RequestArg>) => {
  const { type, accessToken, id } = args

  const response = await fetch(`https://api.spotify.com/v1/${type}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const data = await response.json()
  return data
}

export const getNewReleases = async (args: Partial<NewReleasesArgs>) => {
  const { accessToken, limit, country } = args

  const response = await fetch(
    `https://api.spotify.com/v1/browse/new-releases?country=${country}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }
  )

  const data = await response.json()
  return data.albums.items
}

export const getFeaturedPlaylists = async (args: Partial<FeaturedPlaylistsProps>) => {
  const { limit, accessToken, country } = args

  const response = await fetch(
    `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }
  )

  const data = await response.json()
  return data.playlists.items
}

interface SearchArgs {
  accessToken: string
  query: string
  types?: SearchTypes
  limit?: number
  market?: countries
}

type SearchTypes =
  | 'all'
  | Array<'album' | 'artist' | 'playlist' | 'track' | 'show' | 'episode' | 'audiobook'>

export const searchData = async (args: Partial<SearchArgs>) => {
  const { query = '', accessToken, types = 'all', limit = 10, market = 'VN' } = args
  let typesParam: string

  if (types === 'all') {
    typesParam = 'album%2Cplaylist%2Ctrack%2Cartist%2Cshow%2Cepisode%2Caudiobook'
  } else {
    typesParam = types.map((type) => encodeURIComponent(type)).join('%2C')
  }

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=${typesParam}&market=${market}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }
  )
  const data = await response.json()
  return data
}

interface ArtistSearchParams {
  accessToken: string
  id: string
  type?: 'albums' | 'top-tracks' | 'related-artists'
}

export const fetchArtistData = async (args: Partial<ArtistSearchParams>) => {
  const { id, type, accessToken } = args

  const response = await fetch(
    `https://api.spotify.com/v1/artists/${id}/${type ? type : '\n' }`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }
  )

  const data = await response.json()
  return data
}
