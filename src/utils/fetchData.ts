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
