import { spotifyApiClient } from './axiosClient'

interface ShowApiProps {
  id: string
}

const showApi = async (params: Partial<ShowApiProps>) => {
  const { id } = params

  const { data } = await spotifyApiClient.get(`shows/${id}`)

  return data
}

export default showApi
