import { SectionProps } from '../../types'
import { getAccessToken, getFeaturedPlaylists, getNewReleases } from './fetchData'

interface PropsType {
  type: 'newRelease' | 'featuredPlaylists'
  setData: React.Dispatch<React.SetStateAction<SectionProps | undefined>>
}

const fetchHomePageSectionData = (args: Partial<PropsType>) => {
  const { type, setData } = args

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
  }
}

export default fetchHomePageSectionData
