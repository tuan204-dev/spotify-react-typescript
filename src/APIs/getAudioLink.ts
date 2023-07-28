import axios from 'axios'

interface GetAudioLinkParams {
  type?: 'track' | 'show'
  query: string
}

const ytSearch = async (paramsSearch: GetAudioLinkParams) => {
  const { type, query } = paramsSearch
  const url =
    type === 'track'
      ? 'https://fastytapi.p.rapidapi.com/ytapi/search'
      : 'https://yt-api.p.rapidapi.com/search'
  const params =
    type === 'track'
      ? {
          query: `${query}`,
          resultsType: 'video',
          sortBy: 'relevance',
          geo: 'GB',
        }
      : {
          query: query,
          sort_by: 'relevance',
        }

  const apiKey =
    type === 'track'
      ? import.meta.env.VITE_RAPID_YOUTUBE_SEARCH
      : import.meta.env.VITE_RAPID_YOUTUBE_SEARCH_PODCAST
  const rapidHost =
    type === 'track' ? 'fastytapi.p.rapidapi.com' : 'yt-api.p.rapidapi.com'

  const option = {
    method: 'GET',
    url,
    params,
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': rapidHost,
    },
  }

  const { data } = await axios.request(option)
  console.log(query)
  if (type === 'track') {
    return data?.data?.find((item: any) => item.lengthSeconds < 600)?.videoId
  }
  return data?.data[0]?.videoId
}

export const getAudioLink = async (params: GetAudioLinkParams) => {
  const { query, type } = params
  const id = await ytSearch({ query, type })
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
