import { getUserAlbum, getUserPlaylist, getUserTopArtists } from '@/APIs/userApi'

interface argsProps {
  type: 'playlist' | 'album' | 'artist'
  userId: string
}

const fetchSidebarData = async (args: Partial<argsProps>) => {
  const { type, userId } = args

  switch (type) {
    case 'playlist': {
      const data = await getUserPlaylist(userId as string)
      return data?.items
    }
    case 'artist': {
      const data = await getUserTopArtists()
      return data?.items
    }
    case 'album': {
      const data = await getUserAlbum()
      return data?.items
    }
    default: {
      const data = await getUserPlaylist(userId as string)
      return data?.items
    }
  }
}

export default fetchSidebarData
