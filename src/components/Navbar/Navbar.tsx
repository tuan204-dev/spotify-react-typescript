import classNames from 'classnames/bind'
import React, { FC, useEffect, useRef } from 'react'
import { FaUser } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { MdOutlineClear } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import { PlayButton } from '../UIs'
import styles from './Navbar.module.scss'

const cx = classNames.bind(styles)

interface NavbarProps {
  type?: 'default' | 'home' | 'section' | 'search' | 'artist'
  bgColor?: string | null
  navOpacity?: number
  query?: string
  title?: string
  playBtnVisible?: boolean
  inclPlayBtn?: boolean
  setQuery?: React.Dispatch<React.SetStateAction<string>>
}

const Navbar: FC<NavbarProps> = (props) => {
  const {
    bgColor,
    navOpacity = 1,
    query,
    setQuery,
    type = 'default',
    title,
    playBtnVisible = false,
    inclPlayBtn = false,
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
    <nav className={cx('nav')}>
      <div
        style={{
          backgroundColor: `${type === 'section' ? '#121212' : bgColor}`,
          opacity: `${navOpacity}`,
          backgroundImage: `${
            type === 'home' && 'linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .6))'
          }`,
        }}
        className={cx({ 'nav-bg': true, darken: bgColor })}
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
        {inclPlayBtn && (
          <div
            className={cx('nav-control-play-btn')}
            style={{ opacity: playBtnVisible ? 1 : undefined }}
          >
            <div>
              <PlayButton size={48} transitionDuration={33} scaleHovering={1.005} />
            </div>
            <div className={cx('artist-name')}>
              <span>{title}</span>
            </div>
          </div>
        )}
      </div>
      <div className={cx('user')}>
        <button>
          <FaUser />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
