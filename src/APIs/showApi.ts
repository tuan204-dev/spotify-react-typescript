import { spotifyApiDev } from './axiosClient'

interface ShowApiProps {
  id?: string
}

const showApi = async (params: ShowApiProps) => {
  const { id } = params

  const { data } = await spotifyApiDev.get(`shows/${id}`)

  return data
}

export default showApi
