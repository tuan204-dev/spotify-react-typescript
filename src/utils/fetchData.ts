
export const types = {
  albums: 'albums',
  artists: 'artists',
  episodes: 'episodes',
  genres: 'genres',
  playlists: 'playlists',
  podcasts: 'podcasts',
  tracks: 'tracks',
  users: 'users',
  multi: 'multi',
}

export const options = {
  search: 'search',
  artists: 'artists',
  tracks: 'tracks',
  playlist: 'playlist',
}

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

interface RequestArg {
  type: 'playlists' | 'albums'
  accessToken: string
  id: string
}

export const fetchSpotifyData = async (args: Partial<RequestArg>) => {
  const { type, accessToken, id } = args

  const response = await fetch(
    `https://api.spotify.com/v1/${type}/${id}`,
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

interface NewReleasesArgs {
  accessToken: string
  limit: number
  country:
    | 'AD'
    | 'AE'
    | 'AG'
    | 'AL'
    | 'AM'
    | 'AO'
    | 'AR'
    | 'AT'
    | 'AU'
    | 'AZ'
    | 'BA'
    | 'BB'
    | 'BD'
    | 'BE'
    | 'BF'
    | 'BG'
    | 'BH'
    | 'BI'
    | 'BJ'
    | 'BN'
    | 'BO'
    | 'BR'
    | 'BS'
    | 'BT'
    | 'BW'
    | 'BY'
    | 'BZ'
    | 'CA'
    | 'CD'
    | 'CG'
    | 'CH'
    | 'CI'
    | 'CL'
    | 'CM'
    | 'CO'
    | 'CR'
    | 'CV'
    | 'CW'
    | 'CY'
    | 'CZ'
    | 'DE'
    | 'DJ'
    | 'DK'
    | 'DM'
    | 'DO'
    | 'DZ'
    | 'EC'
    | 'EE'
    | 'EG'
    | 'ES'
    | 'ET'
    | 'FI'
    | 'FJ'
    | 'FM'
    | 'FR'
    | 'GA'
    | 'GB'
    | 'GD'
    | 'GE'
    | 'GH'
    | 'GM'
    | 'GN'
    | 'GQ'
    | 'GR'
    | 'GT'
    | 'GW'
    | 'GY'
    | 'HK'
    | 'HN'
    | 'HR'
    | 'HT'
    | 'HU'
    | 'ID'
    | 'IE'
    | 'IL'
    | 'IN'
    | 'IQ'
    | 'IS'
    | 'IT'
    | 'JM'
    | 'JO'
    | 'JP'
    | 'KE'
    | 'KG'
    | 'KH'
    | 'KI'
    | 'KM'
    | 'KN'
    | 'KR'
    | 'KW'
    | 'KZ'
    | 'LA'
    | 'LB'
    | 'LC'
    | 'LI'
    | 'LK'
    | 'LR'
    | 'LS'
    | 'LT'
    | 'LU'
    | 'LV'
    | 'LY'
    | 'MA'
    | 'MC'
    | 'MD'
    | 'ME'
    | 'MG'
    | 'MH'
    | 'MK'
    | 'ML'
    | 'MN'
    | 'MO'
    | 'MR'
    | 'MT'
    | 'MU'
    | 'MV'
    | 'MW'
    | 'MX'
    | 'MY'
    | 'MZ'
    | 'NA'
    | 'NE'
    | 'NG'
    | 'NI'
    | 'NL'
    | 'NO'
    | 'NP'
    | 'NR'
    | 'NZ'
    | 'OM'
    | 'PA'
    | 'PE'
    | 'PG'
    | 'PH'
    | 'PK'
    | 'PL'
    | 'PS'
    | 'PT'
    | 'PW'
    | 'PY'
    | 'QA'
    | 'RO'
    | 'RS'
    | 'RW'
    | 'SA'
    | 'SB'
    | 'SC'
    | 'SE'
    | 'SG'
    | 'SI'
    | 'SK'
    | 'SL'
    | 'SM'
    | 'SN'
    | 'SR'
    | 'ST'
    | 'SV'
    | 'SZ'
    | 'TD'
    | 'TG'
    | 'TH'
    | 'TJ'
    | 'TL'
    | 'TN'
    | 'TO'
    | 'TR'
    | 'TT'
    | 'TV'
    | 'TW'
    | 'TZ'
    | 'UA'
    | 'UG'
    | 'US'
    | 'UY'
    | 'UZ'
    | 'VC'
    | 'VE'
    | 'VN'
    | 'VU'
    | 'WS'
    | 'XK'
    | 'ZA'
    | 'ZM'
    | 'ZW'
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
