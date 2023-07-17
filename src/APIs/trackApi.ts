import { spotifyApiClient } from './axiosClient'

interface TrackApiProps {
  id: string
}

const trackApi = async (params: Partial<TrackApiProps>) => {
  const { id } = params

  const { data } = await spotifyApiClient.get(`tracks/${id}`)

  return data
}

export default trackApi
