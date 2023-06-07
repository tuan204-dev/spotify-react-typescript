import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import SongItemTag from '../SongItemTag/SongItemTag'
import styles from './Header.module.scss'
import Greeting from '../Greeting/Greeting'
import Navbar from '../Navbar/Navbar'

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


  return (
    <div
      style={{
        background: `${bgColor}`,
      }}
      className={cx('header')}
    >
      {/* <div className={cx('nav')}>
        <div className={cx('nav-button')}>
          <button
            disabled={Boolean(location.prev)}
            // onClick={() => {}}
          >
            <IoIosArrowBack />
          </button>
          <button
            disabled={Boolean(location.next)}
          >
            <IoIosArrowForward />
          </button>
        </div>
        <div className={cx('user')}>
          <button>
            <FaUser />
          </button>
        </div>
      </div> */}
      <Navbar/>

      <Greeting setBgColor={setBgColor}/>
    </div>
  )
}

export default Header
