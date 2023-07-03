import { SectionData } from '@/pages/Section/Section'
import { SectionProps } from '../../types'
import {
  getAccessToken,
  getFeaturedPlaylists,
  getNewReleases,
  searchData,
} from './fetchData'

interface PropsType {
  type: 'newRelease' | 'featuredPlaylists' | 'topMixes' | 'suggestedArtists'
  setData:
    | React.Dispatch<React.SetStateAction<SectionProps | undefined>>
    | React.Dispatch<React.SetStateAction<SectionData>>
  limit?: number
}

const fetchHomePageSectionData = (args: Partial<PropsType>) => {
  const { type, setData, limit = 50 } = args
  console.log(limit)

  switch (type) {
    case 'newRelease': {
      const data = localStorage.getItem('newReleasesData')
      if (data) {
        setData!({
          title: 'New Releases',
          href: '/section?newReleases',
          dataType: 'album',
          data: JSON.parse(data),
        })
      } else {
        const fetchData = async () => {
          const token = await getAccessToken()
          const responseData = await getNewReleases({
            accessToken: token,
            limit: 10,
            country: 'VN',
          })
          localStorage.setItem('newReleasesData', JSON.stringify(responseData))
          setData!({
            title: 'New Releases',
            href: '/section?newReleases',
            dataType: 'album',
            data: responseData,
          })
        }
        fetchData()
      }
      break
    }

    case 'featuredPlaylists': {
      const data = localStorage.getItem('featuredPlaylists')
      if (data) {
        setData!({
          title: 'Feature Playlist',
          href: '/section?featurePlaylist',
          dataType: 'playlist',
          data: JSON.parse(data),
        })
      } else {
        const fetchData = async () => {
          const token = await getAccessToken()
          const responseData = await getFeaturedPlaylists({
            accessToken: token,
            limit: 10,
            country: 'VN',
          })
          localStorage.setItem('featuredPlaylists', JSON.stringify(responseData))
          setData!({
            title: 'Feature Playlist',
            href: '/section?featurePlaylist',
            dataType: 'playlist',
            data: responseData,
          })
        }
        fetchData()
      }
      break
    }

    case 'topMixes': {
      const data = localStorage.getItem('topMixes')
      if (data) {
        setData!({
          title: 'Top mixes',
          href: '/section?topMixes',
          dataType: 'playlist',
          data: JSON.parse(data),
        })
      } else {
        const fetchData = async () => {
          const token = await getAccessToken()
          const responseData = await searchData({
            accessToken: token,
            query: 'mixes',
            types: ['playlist'],
            limit: limit,
          })
          console.log(responseData)
          localStorage.setItem('topMixes', JSON.stringify(responseData?.playlists.items))
          setData!({
            title: 'Top mixes',
            href: '/section?topMixes',
            dataType: 'playlist',
            data: responseData?.playlists.items,
          })
        }
        fetchData()
      }
      break
    }

    case 'suggestedArtists': {
      const data = localStorage.getItem('suggestedArtists')
      if (data) {
        setData!({
          title: 'Suggested artists',
          href: '/section?suggestedArtists',
          dataType: 'artist',
          data: JSON.parse(data),
        })
      } else {
        const fetchData = async () => {
          const token = await getAccessToken()
          const responseData = await searchData({
            accessToken: token,
            query: 'artist',
            types: ['artist'],
            limit: limit,
          })
          console.log(responseData)
          localStorage.setItem(
            'suggestedArtists',
            JSON.stringify(responseData?.artists.items)
          )
          setData!({
            title: 'Suggested artists',
            href: '/section?suggestedArtists',
            dataType: 'artist',
            data: responseData?.artists.items
              .sort((a: any, b: any) => -a.popularity + b.popularity)
              .filter((artist: any) => artist.images.length !== 0),
          })
        }
        fetchData()
      }
      break
    }
  }
}

export default fetchHomePageSectionData
