import browserApi from '@/APIs/browserApi'
import searchApi from '@/APIs/searchApi'
import { SectionProps } from '../../types'

interface PropsType {
  type: 'newRelease' | 'featuredPlaylists' | 'topMixes' | 'suggestedArtists'
  setData: React.Dispatch<React.SetStateAction<SectionProps | undefined>>
  limit?: number
}

const fetchHomePageSectionData = (args: Partial<PropsType>) => {
  const { type, setData, limit = 50 } = args

  switch (type) {
    case 'newRelease': {
      const data = localStorage.getItem('newReleasesData')
      if (data) {
        setData!({
          title: 'New Releases',
          href: '/section/newReleases',
          dataType: 'album',
          data: JSON.parse(data),
          apiType: 'spotify',
        })
      } else {
        const fetchData = async () => {
          const responseData = await browserApi({
            limit: 9,
            country: 'VN',
            type: 'new-releases',
          })
          localStorage.setItem('newReleasesData', JSON.stringify(responseData))
          setData!({
            title: 'New Releases',
            href: '/section/newReleases',
            dataType: 'album',
            data: responseData,
            apiType: 'spotify',
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
          href: '/section/featurePlaylist',
          dataType: 'playlist',
          data: JSON.parse(data),
          apiType: 'spotify',
        })
      } else {
        const fetchData = async () => {
          const responseData = await browserApi({
            limit: 10,
            country: 'VN',
            type: 'featured-playlists',
          })
          localStorage.setItem('featuredPlaylists', JSON.stringify(responseData))
          setData!({
            title: 'Feature Playlist',
            href: '/section/featurePlaylist',
            dataType: 'playlist',
            data: responseData,
            apiType: 'spotify',
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
          href: '/section/topMixes',
          dataType: 'playlist',
          data: JSON.parse(data),
          apiType: 'spotify',
        })
      } else {
        const fetchData = async () => {
          const responseData = await searchApi({
            query: 'chill mix lofi',
            types: ['playlist'],
            limit: limit,
          })
          localStorage.setItem('topMixes', JSON.stringify(responseData?.playlists.items))
          setData!({
            title: 'Top mixes',
            href: '/section/topMixes',
            dataType: 'playlist',
            data: responseData?.playlists.items,
            apiType: 'spotify',
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
          href: '/section/suggestedArtists',
          dataType: 'artist',
          data: JSON.parse(data),
          apiType: 'spotify',
        })
      } else {
        const fetchData = async () => {
          const responseData = await searchApi({
            query: 'artist',
            types: ['artist'],
            limit: limit,
          })
          localStorage.setItem(
            'suggestedArtists',
            JSON.stringify(
              responseData?.artists.items
                .sort((a: any, b: any) => -a.popularity + b.popularity)
                .filter((artist: any) => artist.images.length !== 0)
            )
          )
          setData!({
            title: 'Suggested artists',
            href: '/section/suggestedArtists',
            dataType: 'artist',
            data: responseData?.artists.items
              .sort((a: any, b: any) => -a.popularity + b.popularity)
              .filter((artist: any) => artist.images.length !== 0),
            apiType: 'spotify',
          })
        }
        fetchData()
      }
      break
    }
  }
}

export default fetchHomePageSectionData
