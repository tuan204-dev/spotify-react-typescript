// import { getPlaybackState, getUserQueue, pauseApi } from '@/APIs/playerApi'
import { useNavigate } from 'react-router-dom'

const Test = () => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getTrackRecommendation({
  //       seed_artists: '57g2v7gJZepcwsuwssIfZs',
  //       seed_tracks: '1XqeUpPJc699Az6Z53DIRZ',
  //     })
  //     console.log(data)
  //   }
  //   fetchData()
  // }, [])

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/search')
  }

  return <button onClick={handleClick}>Test</button>
}

export default Test
