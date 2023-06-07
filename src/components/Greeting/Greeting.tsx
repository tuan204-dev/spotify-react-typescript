import React, { FC, useEffect, useState } from 'react'
import SongItemTag from '../SongItemTag/SongItemTag'
import styles from './Greeting.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface GreetingProps {
  bgColor: string | null
  setBgColor: React.Dispatch<React.SetStateAction<string | null>>
}

const Greeting: FC<GreetingProps> = (props) => {
  const {bgColor, setBgColor} = props

  const [initSongs, setInitSongs] = useState<[]>([])

  useEffect(() => {
    (async () => {
      const response = await fetch('data/initSongs.json')
      const data = await response.json()

      setInitSongs(data.tracks.items)
    })()
  }, [])

  const greeting = (): string => {
    const currentHour = new Date().getHours()
    if (5 <= currentHour && currentHour <= 11) return 'Good morning'
    if (12 <= currentHour && currentHour <= 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div style={{ backgroundColor: `${bgColor}` }} className={cx('body')}>
      <div className={cx('greet')}>
        <p>{greeting()}</p>
      </div>

      <div className={cx('songs-section')}>
        {initSongs.slice(0, 6).map((item: any, index) => (
          <SongItemTag
            key={index}
            thumbnailUrl={item.data.albumOfTrack.coverArt.sources[0].url}
            name={item.data.name}
            setBgColor={setBgColor}
          />
        ))}
      </div>
    </div>
  )
}

export default Greeting
