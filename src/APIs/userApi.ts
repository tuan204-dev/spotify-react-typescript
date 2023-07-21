import { spotifyApiClient } from './axiosClient'

const userApi = async () => {
  const { data } = await spotifyApiClient.get(`me`)

  return data
}

export default userApi
