import { spotifyApiClient } from './axiosClient'

interface EpisodeApiProps {
  id: string
}

const episodeApi = async (params: Partial<EpisodeApiProps>) => {
  const { id } = params

  const { data } = await spotifyApiClient.get(`episodes/${id}`)

  return data
}

export default episodeApi
