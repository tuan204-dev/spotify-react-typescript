import React, { FC, useEffect, useRef } from 'react'
import { FaUser } from 'react-icons/fa'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { FiSearch } from 'react-icons/fi'
import { MdOutlineClear } from 'react-icons/md'
import styles from './Navbar.module.scss'
import classNames from 'classnames/bind'
import { useNavigate, useLocation } from 'react-router-dom'

const cx = classNames.bind(styles)

interface NavbarProps {
  bgColor?: string | null
  navOpacity?: number
  isHome?: boolean
  isSearch?: boolean
  isSection?: boolean
  query?: string
  setQuery?: React.Dispatch<React.SetStateAction<string>>
}

const Navbar: FC<NavbarProps> = (props) => {
  const {
    bgColor,
    navOpacity = 1,
    isHome = false,
    isSearch = false,
    isSection = false,
    query,
    setQuery,
  } = props

  const {key} = useLocation()
  const navigate = useNavigate()
  const queryRef = useRef<any>(null)

  useEffect(() => {
    if(isSearch) {
      queryRef?.current.focus()
    }
  }, [])
  

  return (
    <div className={cx('nav')}>
      <div
        style={{
          backgroundColor: `${!isSection ? bgColor : '#121212'}`,
          opacity: `${navOpacity}`,
          backgroundImage: `${
            isHome &&
            'linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .6))'
          }`,
        }}
        className={cx('nav-bg')}
      ></div>
      <div className={cx('nav-control')}>
        <div className={cx('nav-control-button')}>
          <button
            disabled={key === 'default'}
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack />
          </button>
          <button
            // disabled={Boolean(location.next)}
            onClick={() => navigate(1)}
          >
            <IoIosArrowForward />
          </button>
        </div>

        {isSearch && (
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
