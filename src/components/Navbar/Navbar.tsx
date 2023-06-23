import React, { FC } from 'react'
import { FaUser } from 'react-icons/fa'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { FiSearch } from 'react-icons/fi'
import { MdOutlineClear } from 'react-icons/md'
import styles from './Navbar.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface NavbarProps {
  bgColor?: string | null
  navOpacity?: number
  isSearch?: boolean
  query?: string
  setQuery?: React.Dispatch<React.SetStateAction<string>>
}

const Navbar: FC<NavbarProps> = (props) => {
  const {
    bgColor,
    navOpacity = 1,
    isSearch = false,
    query,
    setQuery,
  } = props

  // console.log(query)

  return (
    <div className={cx('nav')}>
      <div
        style={{
          backgroundColor: `${bgColor}`,
          opacity: `${navOpacity}`,
          backgroundImage: `${
            isSearch ||
            'linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .6))'
          }`,
        }}
        className={cx('nav-bg')}
      ></div>
      <div className={cx('nav-control')}>
        <div className={cx('nav-control-button')}>
          <button
          // disabled={Boolean(location.prev)}
          >
            <IoIosArrowBack />
          </button>
          <button
          // disabled={Boolean(location.next)}
          >
            <IoIosArrowForward />
          </button>
        </div>

        {isSearch && (
          <div className={cx('nav-control-search')}>
            <form action="#">
              <input
                type="text"
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
