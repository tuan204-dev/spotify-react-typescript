import axios from 'axios'

interface argsProps {
  type: 'playlist' | 'album' | 'artist'
}

const fetchSidebarData = async (args: Partial<argsProps>) => {
  let url: string
  switch (args.type) {
    case 'playlist': {
      url = 'https://api.npoint.io/36dec16e2e6bed21bfa1'
      break
    }
    case 'artist': {
      url = 'https://api.npoint.io/3717808504be2e6a0355'
      break
    }
    case 'album': {
      url = 'https://api.npoint.io/f923219d298ac41c6c03'
      break
    }
    default:
      url = 'https://api.npoint.io/36dec16e2e6bed21bfa1'
  }

  const response = await axios(url)
  return response.data
}

export default fetchSidebarData
