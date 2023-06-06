import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import SongItemTag from '../SongItemTag/SongItemTag'
import styles from './Header.module.scss'

interface HeaderProps {
  children?: React.ReactNode
}

interface Location {
  prev: string | null
  next: string | null
}

const cx = classNames.bind(styles)

const Header: React.FC<HeaderProps> = (props) => {
  const [location, setLocation] = useState<Location>({ prev: null, next: null })
  const [bgColor, setBgColor] = useState<string | null>('#1ed760')

  const [initSongs, setInitSongs] = useState<[]>([])

  useEffect(() => {
    (async () => {
      const response = await fetch('data/initSongs.json')
      const data = await response.json()

      console.log(data)

      setInitSongs(data.tracks.items)
    })()
  }, [])

  // const handlePrevNavigate = (): void => {

  // }

  // const handleNextNavigate = (): void => {

  // }

  // console.log(location)

  const greeting = (): string => {
    const currentHour = new Date().getHours()
    if (5 <= currentHour && currentHour <= 11) return 'Good morning'
    if (12 <= currentHour && currentHour <= 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div
      style={{
        background: `${bgColor}`,
      }}
      className={cx('header')}
    >
      <div className={cx('nav')}>
        <div className={cx('nav-button')}>
          <button
            disabled={Boolean(location.prev)}
            // onClick={() => {}}
          >
            <IoIosArrowBack />
          </button>
          <button
            disabled={Boolean(location.next)}

            // onClick={() => {}}
          >
            <IoIosArrowForward />
          </button>
        </div>
        <div className={cx('user')}>
          <button>
            <FaUser />
          </button>
        </div>
      </div>
      <div className={cx('body')}>
        <div className={cx('greet')}>
          <p>{greeting()}</p>
        </div>

        <div className={cx('songs-section')}>
          {initSongs.map((item: any, index) => (
            <SongItemTag
              key={index}
              thumbnailUrl={item.data.albumOfTrack.coverArt.sources[0].url}
              name={item.data.name}
              setBgColor={setBgColor}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
