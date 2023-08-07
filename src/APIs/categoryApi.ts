import { spotifyApiDev } from './axiosClient'

interface categoryApiProps {
  type: string
  id: string
}

const categoryApi = async (params: Partial<categoryApiProps>) => {
  const { type, id } = params

  const { data } = await spotifyApiDev.get(`${type}/${id}`)

  return data
}

export default categoryApi
