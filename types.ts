export type countries =
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

// API fetching
export interface NewReleasesArgs {
  accessToken: string
  limit: number
  country: countries
}

export interface FeaturedPlaylistsProps {
  limit: number
  accessToken: string
  country: countries
}

export interface RequestArg {
  type: 'playlists' | 'albums'
  accessToken: string
  id: string
}

// ----------------------------------------------------
export interface ArtistData {
  name: string
  id: string
}
export interface SearchBannerItem {
  title?: string
  imageUrl?: string
  bgColor?: string
}

export interface PlayListItem {
  title?: string
  imageUrl?: string
  author?: string
  id?: string
}

export interface ArtistItem {
  name?: string
  imageUrl?: string
  id?: string
}

export interface AlbumItem {
  title?: string
  imageUrl?: string
  id?: string
  author?: string
  dateTime?: string
}

export interface SectionItemI extends PlayListItem, ArtistItem, AlbumItem {
  isArtist?: boolean
  isShow?: boolean
  isLoading?: boolean
  columnWidth?: number
  dataType?: string
  artists?: ArtistData[]
  desc?: string
  publisher?: string
  dateAdd?: string
}

export interface SectionProps {
  title?: string
  href?: string
  data?: ResponseSectionItem[]
  dataType?: string
  isFull?: boolean
  isSearch?: boolean
  isShow?: boolean
}

export interface SongItemTagProps {
  thumbnailUrl?: string
  name?: string
  isLoading?: boolean
  id?: string
  setBgColor: React.Dispatch<React.SetStateAction<string>>
}

export interface HeaderProps {
  title?: string
  thumbnail?: string
  quantity?: number
  type?: 'Playlist' | 'album' | 'single' | 'compilation'
  bgColor?: string
  desc?: string
  isLoading?: boolean
  artists?: string
  releaseDate?: string
  isWhiteColor?: boolean
}

export type LibSelection = {
  title: string
  id: string
  type: 'playlist' | 'album' | 'artist'
  active: boolean
}

export interface ResponseLibItem {
  id?: string
  owner?: {
    display_name?: string
  }
  artists?: ArtistData[]
  name?: string
  images?: {
    url?: string
  }[]
}

export interface ResponseSectionItem {
  id?: string
  name?: string
  images: {
    url: string
  }[]
  publisher?: string
  artists?: ArtistData[]
  description?: string
  owner?: {
    display_name: string
  }
  release_date?: string
}

export interface SongItemProps {
  songName?: string
  artists?: ArtistData[]
  thumb?: string
  duration?: number
  order?: number
  isLoading?: boolean
  album?: string
  dateAdd?: string
  isAlbumTrack?: boolean
  isExplicit?: boolean
  isSearch?: boolean
}
export interface SongListProps {
  songList: SongItemProps[]
  isLoading?: boolean
  pivotTop: number
  top: number
}
