// import axios from 'axios'

// const zingMp3 = axios.create({
//   baseURL: `http://localhost:3000/api`,
// })

// // custom response
// zingMp3.interceptors.response.use(
//   (response) => {
//     return response.data.data
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )

// const getSearch = async (keyword: string) => {
//   try {
//     const data = await zingMp3.get('/search', {
//       params: {
//         keyword: keyword,
//       },
//     })
//     return data
//   } catch (err) {
//     console.log(err)
//   }
// }

// export const getSong = async (name: string) => {
//   try {
//     const { songs } = await getSearch(name)
//     const song = songs.find((item: any) => item.streamingStatus === 1)

//     const data = await zingMp3.get('/song', {
//       params: {
//         id: song.encodeId,
//       },
//     })
//     return { duration: song.duration * 1000, audioLink: data['128'] }
//   } catch (err) {
//     console.log(err)
//   }
// }

// export const ytSearch = async (query: string) => {
//   const options = {
//     method: 'GET',
//     url: 'https://youtube-data8.p.rapidapi.com/search/',
//     params: {
//       q: query,
//       hl: 'vi',
//       gl: 'VN',
//     },
//     headers: {
//       'X-RapidAPI-Key': '4f335c6728msha90b9acfb4b4c97p1cd90djsnd4cc978a726d',
//       'X-RapidAPI-Host': 'youtube-data8.p.rapidapi.com',
//     },
//   }

//   const { data } = await axios.request(options)
//   return data?.contents[0]?.video?.videoId
// }

// export const getAudioTrack = async (name: string) => {
//   const id = await ytSearch(`${name} lyrics`)
//   const options = {
//     method: 'GET',
//     url: 'https://youtube-mp36.p.rapidapi.com/dl',
//     params: { id },
//     headers: {
//       'X-RapidAPI-Key': '4f335c6728msha90b9acfb4b4c97p1cd90djsnd4cc978a726d',
//       'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com',
//     },
//   }

//   const { data } = await axios.request(options)
//   console.log(data)
//   return {
//     duration: data.duration * 1000,
//     audioLink: data.link,
//   }
// }
