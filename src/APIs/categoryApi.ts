import { spotifyApiClientDev } from './axiosClient'

interface categoryApiProps {
  type: string
  id: string
}

const categoryApi = async (params: Partial<categoryApiProps>) => {
  const { type, id } = params

  const { data } = await spotifyApiClientDev.get(`${type}/${id}`)

  return data
}

export default categoryApi
