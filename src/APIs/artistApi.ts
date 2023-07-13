import { rapidApiClient } from './axiosClient'

const artistApi = async (id: string | undefined) => {
  const { data } = await rapidApiClient.get('artist_overview/', {
    params: {
      id: id,
    },
  })

  return data.data.artist
}

export default artistApi
