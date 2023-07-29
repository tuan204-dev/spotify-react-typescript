import axios from 'axios'
import { youtubeApiClient } from './axiosClient'

interface GetAudioLinkParams {
  query: string
}

export const getYoutubeVideoId = async (params: GetAudioLinkParams) => {
  const { query } = params

  const ytApiKey = import.meta.env.VITE_YOUTUBE_API_KEY

  const { data } = await youtubeApiClient.get('search', {
    params: {
      part: 'snippet',
      q: query,
      type: 'video',
      regionCode: 'VN',
      key: ytApiKey,
    },
  })

  return data?.items?.[0]?.id?.videoId
}

export const getAudioLink = async (params: GetAudioLinkParams) => {
  const { query } = params
  console.log(query)
  const id = await getYoutubeVideoId({ query })
  console.log(id)
  const options = {
    method: 'GET',
    url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
    params: { id },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_RAPID_YOUTUBE_AUDIO,
      'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com',
    },
  }
  const { data } = await axios.request(options)
  const returnData = data.adaptiveFormats
    .filter((item: any) => item.mimeType.includes('audio'))
    .sort((a: any, b: any) => -a.bitrate + b.bitrate)[0]

  return {
    audioLink: returnData.url,
    durationMs: Number(returnData.approxDurationMs),
  }
}
