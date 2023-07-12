import { spotifyApiClient } from './axiosClient'

interface categoryApiProps {
  type: string
  id: string
}

const categoryApi = async (params: Partial<categoryApiProps>) => {
  const { type, id } = params

  const { data } = await spotifyApiClient.get(`${type}/${id}`)

  return data
}

export default categoryApi
