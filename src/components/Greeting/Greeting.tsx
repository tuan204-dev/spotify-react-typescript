import { HomePageContext } from '@/contexts/HomePageContext'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import classNames from 'classnames/bind'
import React, { FC, memo, useContext, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import SongItemTag from '../SongItemTag/SongItemTag'
import styles from './Greeting.module.scss'
import { ResponseSectionItem } from '@/types/section'

const cx = classNames.bind(styles)

interface GreetingProps {
  bgColor?: string | null
  setBgColor: React.Dispatch<React.SetStateAction<string>>
}

const Greeting: FC<GreetingProps> = (props) => {
  const { bgColor, setBgColor } = props
  const [isLoading, setLoading] = useState<boolean>(true)

  const { greetingAlbum } = useContext(HomePageContext)

  const { width } = useContext(MainLayoutContext)

  useEffect(() => {
    setBgColor('#e0e0e0')
    setLoading(greetingAlbum?.length === 0)
  }, [greetingAlbum])

  const greeting = (): string => {
    const currentHour = new Date().getHours()
    if (5 <= currentHour && currentHour <= 11) return 'Good morning'
    if (12 <= currentHour && currentHour <= 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div style={{ backgroundColor: `${bgColor}` }} className={cx('body')}>
      <div className={cx('greet')}>
        {!isLoading ? (
          <p>{greeting()}</p>
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
        {!isLoading
          ? greetingAlbum
              ?.slice(0, 6)
              .map((item: ResponseSectionItem, index) => (
                <SongItemTag
                  id={item?.id}
                  isLoading={isLoading}
                  key={item.id || index}
                  thumbnailUrl={item.images[0].url}
                  name={item.name}
                  setBgColor={setBgColor}
                />
              ))
          : Array(6)
              .fill(0)
              .map((item, index) => (
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
