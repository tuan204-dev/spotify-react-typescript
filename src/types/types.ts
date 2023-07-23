// export type countries =
//   | 'AD'
//   | 'AE'
//   | 'AG'
//   | 'AL'
//   | 'AM'
//   | 'AO'
//   | 'AR'
//   | 'AT'
//   | 'AU'
//   | 'AZ'
//   | 'BA'
//   | 'BB'
//   | 'BD'
//   | 'BE'
//   | 'BF'
//   | 'BG'
//   | 'BH'
//   | 'BI'
//   | 'BJ'
//   | 'BN'
//   | 'BO'
//   | 'BR'
//   | 'BS'
//   | 'BT'
//   | 'BW'
//   | 'BY'
//   | 'BZ'
//   | 'CA'
//   | 'CD'
//   | 'CG'
//   | 'CH'
//   | 'CI'
//   | 'CL'
//   | 'CM'
//   | 'CO'
//   | 'CR'
//   | 'CV'
//   | 'CW'
//   | 'CY'
//   | 'CZ'
//   | 'DE'
//   | 'DJ'
//   | 'DK'
//   | 'DM'
//   | 'DO'
//   | 'DZ'
//   | 'EC'
//   | 'EE'
//   | 'EG'
//   | 'ES'
//   | 'ET'
//   | 'FI'
//   | 'FJ'
//   | 'FM'
//   | 'FR'
//   | 'GA'
//   | 'GB'
//   | 'GD'
//   | 'GE'
//   | 'GH'
//   | 'GM'
//   | 'GN'
//   | 'GQ'
//   | 'GR'
//   | 'GT'
//   | 'GW'
//   | 'GY'
//   | 'HK'
//   | 'HN'
//   | 'HR'
//   | 'HT'
//   | 'HU'
//   | 'ID'
//   | 'IE'
//   | 'IL'
//   | 'IN'
//   | 'IQ'
//   | 'IS'
//   | 'IT'
//   | 'JM'
//   | 'JO'
//   | 'JP'
//   | 'KE'
//   | 'KG'
//   | 'KH'
//   | 'KI'
//   | 'KM'
//   | 'KN'
//   | 'KR'
//   | 'KW'
//   | 'KZ'
//   | 'LA'
//   | 'LB'
//   | 'LC'
//   | 'LI'
//   | 'LK'
//   | 'LR'
//   | 'LS'
//   | 'LT'
//   | 'LU'
//   | 'LV'
//   | 'LY'
//   | 'MA'
//   | 'MC'
//   | 'MD'
//   | 'ME'
//   | 'MG'
//   | 'MH'
//   | 'MK'
//   | 'ML'
//   | 'MN'
//   | 'MO'
//   | 'MR'
//   | 'MT'
//   | 'MU'
//   | 'MV'
//   | 'MW'
//   | 'MX'
//   | 'MY'
//   | 'MZ'
//   | 'NA'
//   | 'NE'
//   | 'NG'
//   | 'NI'
//   | 'NL'
//   | 'NO'
//   | 'NP'
//   | 'NR'
//   | 'NZ'
//   | 'OM'
//   | 'PA'
//   | 'PE'
//   | 'PG'
//   | 'PH'
//   | 'PK'
//   | 'PL'
//   | 'PS'
//   | 'PT'
//   | 'PW'
//   | 'PY'
//   | 'QA'
//   | 'RO'
//   | 'RS'
//   | 'RW'
//   | 'SA'
//   | 'SB'
//   | 'SC'
//   | 'SE'
//   | 'SG'
//   | 'SI'
//   | 'SK'
//   | 'SL'
//   | 'SM'
//   | 'SN'
//   | 'SR'
//   | 'ST'
//   | 'SV'
//   | 'SZ'
//   | 'TD'
//   | 'TG'
//   | 'TH'
//   | 'TJ'
//   | 'TL'
//   | 'TN'
//   | 'TO'
//   | 'TR'
//   | 'TT'
//   | 'TV'
//   | 'TW'
//   | 'TZ'
//   | 'UA'
//   | 'UG'
//   | 'US'
//   | 'UY'
//   | 'UZ'
//   | 'VC'
//   | 'VE'
//   | 'VN'
//   | 'VU'
//   | 'WS'
//   | 'XK'
//   | 'ZA'
//   | 'ZM'
//   | 'ZW'

// // API fetching
// export interface NewReleasesArgs {
//   accessToken: string
//   limit: number
//   country: countries
// }

// export interface FeaturedPlaylistsProps {
//   limit: number
//   accessToken: string
//   country: countries
// }

// export interface RequestArg {
//   type: 'playlists' | 'albums'
//   accessToken: string
//   id: string
// }

// // ----------------------------------------------------

// export interface ImageSource {
//   url: string
//   width: number
//   height: number
// }

// interface ColorRaw {
//   hex: string
// }

// interface ExtractedColors {
//   colorRaw: ColorRaw
// }

// interface GalleryItem {
//   sources: ImageSource[]
// }

// interface Gallery {
//   items: GalleryItem[]
// }

// interface AvatarImage {
//   sources: ImageSource[]
//   extractedColors: ExtractedColors
// }

// interface HeaderImage {
//   sources: ImageSource[]
//   extractedColors: ExtractedColors
// }

// interface Visuals {
//   avatarImage: AvatarImage
//   gallery: Gallery
//   headerImage: HeaderImage
// }

// export interface ArtistData {
//   name: string
//   id: string
// }
// export interface SearchBannerItem {
//   title?: string
//   imageUrl?: string
//   bgColor?: string
// }

// export interface PlayListItem {
//   title?: string
//   imageUrl?: string
//   author?: string
//   id?: string
// }

// export interface ArtistItem {
//   name?: string
//   imageUrl?: string
//   id?: string
// }

// export interface AlbumItem {
//   title?: string
//   imageUrl?: string
//   id?: string
//   author?: string
//   dateTime?: string
// }

// export interface SectionItemI extends PlayListItem, ArtistItem, AlbumItem {
//   isArtist?: boolean
//   isLoading?: boolean
//   columnWidth?: number
//   dataType?: string
//   artists?: ArtistData[]
//   desc?: string
//   publisher?: string
//   dateAdd?: string
//   type?: 'default' | 'playlist' | 'album' | 'artistList' | 'artist' | 'show'
// }

// export interface SectionProps {
//   title?: string
//   href?: string
//   data?: ResponseSectionItem[]
//   dataType?: string
//   isFull?: boolean
//   isClickable?: boolean
//   hideHeader?: boolean
//   type?: 'default' | 'playlist' | 'album' | 'artistList' | 'artist' | 'show'
//   apiType: 'spotify' | 'rapid' | undefined
// }

// export interface SongItemTagProps {
//   thumbnailUrl?: string
//   name?: string
//   isLoading?: boolean
//   id?: string
//   setBgColor: React.Dispatch<React.SetStateAction<string>>
// }

// export interface HeaderProps {
//   title?: string
//   thumbnail?: string
//   quantity?: number
//   type?: 'Playlist' | 'album' | 'single' | 'compilation' | 'podcast' | 'episode'
//   bgColor?: string
//   desc?: string
//   isLoading?: boolean
//   artists?: string
//   releaseDate?: string
//   isWhiteColor?: boolean
//   headerType?: 'playlist' | 'album' | 'show'
//   publisher?: string
//   showName?: string
//   showId?: string
// }

// export type LibSelection = {
//   title: string
//   id: string
//   type: 'playlist' | 'album' | 'artist'
//   active: boolean
// }

// export interface ResponseLibItem {
//   id?: string
//   owner?: {
//     display_name?: string
//   }
//   artists?: ArtistData[]
//   name?: string
//   images?: {
//     url?: string
//   }[]
// }

// export interface ResponseSectionItem {
//   id?: string
//   name?: string
//   images:
//     | {
//         url: string
//       }[]
//     | any
//   publisher?: string
//   artists?: ArtistData[]
//   description?: string
//   owner?: {
//     display_name: string
//   }
//   release_date?: string
//   uri?: string
//   visuals?: Visuals
//   profile?: any
//   releases?: any
//   coverArt?: any
//   date?: any
// }

// export interface SongItemProps {
//   songName?: string
//   artists?: ArtistData[]
//   thumb?: string
//   duration?: number
//   order?: number
//   isLoading?: boolean
//   albumData?: SpotifyAlbum
//   dateAdd?: string
//   isExplicit?: boolean
//   type?: 'default' | 'playlist' | 'album' | 'search' | 'artist'
//   id?: string
// }
// export interface SongListProps {
//   songList: SongItemProps[]
//   pivotTop: number
//   top: number
//   isLoading?: boolean
//   type?: 'default' | 'playlist' | 'album' | 'search' | 'artist'
// }

// // ____________Artist______________

// export interface ArtistProfile {
//   id: string | undefined
//   name: string | undefined
//   bio: string | undefined
//   isVerified: boolean | undefined
//   biography?: { text: string }
// }

// export interface ArtistTopCity {
//   city: string
//   country: string
//   numberOfListeners: number
//   region: string
// }

// export interface ArtistStats {
//   followers: number
//   monthlyListeners: number
//   topCities: { items: ArtistTopCity[] }
// }

// export interface SpotifyAlbum {
//   artists?: ArtistData[]
//   images?: { url?: string }[]
//   id?: string
//   name?: string
// }

// export interface SpotifyTrack {
//   album?: SpotifyAlbum
//   artists?: ArtistData[]
//   duration_ms?: number
//   name?: string
//   id?: string
// }

// export interface RapidTrack {
//   soundcloudTrack?: {
//     audio?: {
//       quality?: string
//       url?: string
//       durationMs?: number
//       durationText?: string
//     }[]
//   }
// }

// // ------Shows------

// export interface ShowItem {
//   description?: string
//   html_description?: string
//   duration_ms?: number
//   explicit?: boolean
//   id?: string
//   images?: ImageSource[]
//   name?: string
//   release_date?: string
// }

// export interface ShowData {
//   description?: string
//   html_description?: string
//   episodes?: {
//     items?: ShowItem[]
//   }
//   explicit?: boolean
//   id?: string
//   images?: ImageSource[]
//   name?: string
//   publisher?: string
//   total_episodes?: number
// }

// export interface Episode extends ShowItem {
//   show?: {
//     id?: string
//     images?: ImageSource[]
//     name?: string
//     publisher?: string
//   }
// }

// // ------user------
// export interface UserData {
//   display_name?: string
//   id?: string
//   images?: ImageSource[]
//   email?: string
//   country?: countries
//   followers?: { total?: number }
// }