import React, { FC } from 'react'
import { FaUser } from 'react-icons/fa'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import styles from './Navbar.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface NavbarProps {
  bgColor: string | null
  navOpacity: number
}

const Navbar: FC<NavbarProps> = (props) => {
  const { bgColor, navOpacity } = props

  return (
    <div className={cx('nav')}>
      <div
        style={{ backgroundColor: `${bgColor}`, opacity: `${navOpacity}` }}
        className={cx('nav-bg')}
      ></div>
      <div className={cx('nav-button')}>
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
      <div className={cx('user')}>
        <button>
          <FaUser />
        </button>
      </div>
    </div>
  )
}

export default Navbar
