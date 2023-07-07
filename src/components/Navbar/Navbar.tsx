import React, { FC, useEffect, useRef } from 'react'
import { FaUser } from 'react-icons/fa'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { FiSearch } from 'react-icons/fi'
import { MdOutlineClear } from 'react-icons/md'
import styles from './Navbar.module.scss'
import classNames from 'classnames/bind'
import { useNavigate, useLocation } from 'react-router-dom'
import { TbPlayerPlayFilled } from 'react-icons/tb'
import { PlayButton } from '../UIs'

const cx = classNames.bind(styles)

interface NavbarProps {
  type?: 'default' | 'home' | 'section' | 'search' | 'artist'
  bgColor?: string | null
  navOpacity?: number
  query?: string
  artistName?: string
  playBtnVisible?: boolean
  setQuery?: React.Dispatch<React.SetStateAction<string>>
}

const Navbar: FC<NavbarProps> = (props) => {
  const {
    bgColor,
    navOpacity = 1,
    query,
    setQuery,
    type = 'default',
    artistName,
    playBtnVisible = false,
  } = props

  const { key } = useLocation()
  const navigate = useNavigate()
  const queryRef = useRef<any>(null)

  useEffect(() => {
    if (type === 'search') {
      queryRef?.current.focus()
    }
  }, [])

  return (
    <div className={cx('nav')}>
      <div
        style={{
          backgroundColor: `${type === 'section' ? '#121212' : bgColor}`,
          opacity: `${navOpacity}`,
          backgroundImage: `${
            type === 'home' && 'linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .6))'
          }`,
        }}
        className={cx('nav-bg')}
      ></div>
      <div className={cx('nav-control')}>
        <div className={cx('nav-control-button')}>
          <button disabled={key === 'default'} onClick={() => navigate(-1)}>
            <IoIosArrowBack />
          </button>
          <button
            // disabled={Boolean(location.next)}
            onClick={() => navigate(1)}
          >
            <IoIosArrowForward />
          </button>
        </div>

        {type === 'search' && (
          <div className={cx('nav-control-search')}>
            <form action="#">
              <input
                type="text"
                ref={queryRef}
                placeholder="What do you want to listen to?"
                onChange={(e) => setQuery!(e.target.value)}
                value={query}
              />
            </form>

            <div className={cx({ icon: true, 'search-icon': true })}>
              <FiSearch />
            </div>
            {query && (
              <button
                className={cx({ icon: true, 'clear-btn': true })}
                onClick={() => setQuery!('')}
              >
                <MdOutlineClear />
              </button>
            )}
          </div>
        )}
        {type === 'artist' && playBtnVisible && (
          <div className={cx('nav-control-play-btn')}>
            <div>
              <PlayButton size={48} transitionDuration={33} scaleHovering={1.005} />
            </div>
            <div className={cx('artist-name')}>
              <span>{artistName}</span>P
            </div>
          </div>
        )}
      </div>
      <div className={cx('user')}>
        <button>
          <FaUser />
        </button>
      </div>
    </div>
  )
}

export default Navbar
