// import { getPlaybackState, getUserQueue, pauseApi } from '@/APIs/playerApi'
import { getUserQueue } from '@/apis/playerApi'
import { useEffect } from 'react'

const Test = () => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserQueue()
      console.log(data)
    }
    fetchData()
  }, [])

  return <div>Test</div>
}

export default Test
