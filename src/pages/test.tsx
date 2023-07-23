// import { getPlaybackState, getUserQueue, pauseApi } from '@/APIs/playerApi'
import { useEffect } from 'react'

const Test = () => {
  // const fetchData = async () => {
  //   const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  //   const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
  //   const response = await fetch('https://accounts.spotify.com/api/token', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
  //     },
  //     body: 'grant_type=client_credentials',
  //   })

  //   const data = await response.json()
  //   console.log(data)
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])


  useEffect(() => {
    const fetchData = async () => {
      // await getPlaybackState()
    }

    fetchData()
  }, [])

  return <div>Test</div>
}

export default Test
