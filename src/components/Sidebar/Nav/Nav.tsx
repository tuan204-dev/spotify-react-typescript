import { useMemo } from 'react'
import styles from './Nav.module.scss'
import classNames from 'classnames/bind'
import { Link, useLocation } from 'react-router-dom'
import {
  RiHome5Fill,
  RiHome5Line,
  RiSearch2Line,
  RiSearchEyeLine,
} from 'react-icons/ri'

const cx = classNames.bind(styles)

const Nav = () => {
  const { pathname } = useLocation()

  const routes = useMemo(
    () => [
      {
        name: 'Home',
        path: '/',
        active: pathname === '/',
        icons: [RiHome5Fill, RiHome5Line],
      },
      {
        name: 'Search',
        path: '/search',
        active: pathname === '/search',
        icons: [RiSearchEyeLine, RiSearch2Line],
      },
    ],
    [pathname]
  )

  return (
    <div className={cx('nav')}>
      {routes.map((item, index) => {
        const ActiveIcon = item.icons[0]
        const InactiveIcon = item.icons[1]

        return (
          <Link style={{ textDecoration: 'none' }} key={index} to={item.path}>
            <div className={cx({ 'nav-item': true, active: item.active })}>
              <div className={cx('nav-icon')}>
                {item.active ? <ActiveIcon /> : <InactiveIcon />}
              </div>
              <p className={cx('nav-name')}>{item.name}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
} 

export default Nav
