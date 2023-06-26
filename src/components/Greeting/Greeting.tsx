import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import classNames from 'classnames/bind'
import React, { FC, useContext, useEffect, useState, memo } from 'react'
import SongItemTag from '../SongItemTag/SongItemTag'
import styles from './Greeting.module.scss'
import Skeleton from 'react-loading-skeleton'

const cx = classNames.bind(styles)

interface GreetingProps {
  bgColor?: string | null
  setBgColor: React.Dispatch<React.SetStateAction<string>>
}

const Greeting: FC<GreetingProps> = (props) => {
  const { bgColor, setBgColor } = props

  const [isLoading, setLoading] = useState<boolean>(true)
  const [initSongs, setInitSongs] = useState<[]>([])

  const { width } = useContext(MainLayoutContext)

  useEffect(() => {
    setBgColor('#535353')
    setLoading(Boolean(!initSongs))
  }, [initSongs])

  useEffect(() => {
    (async () => {
      const response = await fetch('data/initSongs.json')
      const data = await response.json()

      setInitSongs(data.data)
    })()
  }, [])

  const greeting = (): string => {
    const currentHour = new Date().getHours()
    if (5 <= currentHour && currentHour <= 11) return 'Good morning'
    if (12 <= currentHour && currentHour <= 17) return 'Good afternoon'
    return 'Good evening'
  }

  // console.log('im here')

  return (
    <div style={{ backgroundColor: `${bgColor}` }} className={cx('body')}>
      <div className={cx('greet')}>
        {!isLoading ? (
          <p>{greeting()}</p>
          // <p>Good evening</p>
        ) : (
          <Skeleton width={'35%'} height={50} borderRadius={50} />
        )}
      </div>

      <div
        className={cx({
          'songs-section': true,
          'songs-section-responsive': width !== -1 && width <= 900,
        })}
      >
        {!isLoading ? initSongs.slice(0, 6).map((item: any, index) => (
          <SongItemTag
            isLoading={isLoading}
            key={index}
            thumbnailUrl={item.imageUrl}
            name={item.title}
            setBgColor={setBgColor}
          />
        )) : Array(6).fill(0).map((item ,index) => (
          <SongItemTag
            key={index + item}
            isLoading={isLoading}
            setBgColor={setBgColor}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(Greeting)
