import axios from 'axios'

export const types = {
  albums: 'albums',
  artists: 'artists',
  episodes: 'episodes',
  genres: 'genres',
  playlists: 'playlists',
  podcasts: 'podcasts',
  tracks: 'tracks',
  users: 'users',
  multi: 'multi',
}

export const options = {
  search: 'search',
  artists: 'artists',
  tracks: 'tracks',
  playlist: 'playlist',
}

export const fetchData = async (
  option: string,
  param: string,
  type = 'multi',
  limit = 10
) => {
  const options = {
    method: 'GET',
    url: `https://spotify-web2.p.rapidapi.com/${option}/`,
    params: {
      q: param,
      type: type,
      offset: '0',
      limit: `${limit}`,
      numberOfTopResults: '5',
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_SPOTIFY_API,
      'X-RapidAPI-Host': 'spotify-web2.p.rapidapi.com',
    },
  }
  const response = await axios.request(options)
  return response
}

// export const fetchPlaylist = async (id: string) => {
//   const options = {
//     method: 'GET',
//     url: 'https://spotify117.p.rapidapi.com/spotify_playlist/',
//     params: {
//       url: `https://open.spotify.com/playlist/${id}`,
//     },
//     headers: {
//       'X-RapidAPI-Key':
//         'a0dbb83576mshf14f95d278ccb62p160b08jsn3a23196bcf06',
//       'X-RapidAPI-Host': 'spotify117.p.rapidapi.com',
//     },
//   }

//   const response = await axios.request(options)
//   // console.log(response.data);
//   return response.data
// }

const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')

export const fetchPlaylist = async (id: string) => {
  const response = await fetch(
    `https://v1.nocodeapi.com/tuan204_dev/spotify/ExjCMLdAjTGUkUNr/playlists?id=${id}`,
    {
      method: 'get',
      headers: myHeaders,
      redirect: 'follow',
    }
  )
  const data = await response.json()

  console.log(data)

  return data
}

export const fetchAlbum = async (id: string) => {
  const options = {
    method: 'GET',
    url: 'https://spotify23.p.rapidapi.com/albums/',
    params: {
      ids: id,
    },
    headers: {
      'X-RapidAPI-Key':
        'a0dbb83576mshf14f95d278ccb62p160b08jsn3a23196bcf06',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
    },
  }

  const response = await axios.request(options)
  // console.log(response.data);
  return response.data
}
