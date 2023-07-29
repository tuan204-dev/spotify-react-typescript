import { getYoutubeVideoId } from '@/apis/getAudioLink'
import { useEffect } from 'react'

const Test = () => {
  useEffect(() => {
    const fetchData = async () => {
      await getYoutubeVideoId({
        query: '00 RPT MCK album 99% ',
      })
    }

    fetchData()
  }, [])

  return <div>test</div>
}

export default Test
