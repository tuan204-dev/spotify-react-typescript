import { HomeActiveIcon, HomeIcon, SearchActiveIcon, SearchIcon } from '@/assets/icons'
import classNames from 'classnames/bind'
import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Nav.module.scss'

const cx = classNames.bind(styles)

const Nav = () => {
  const { pathname } = useLocation()

  const routes = useMemo(
    () => [
      {
        name: 'Home',
        path: '/',
        active: pathname === '/',
        icons: [HomeActiveIcon, HomeIcon],
      },
      {
        name: 'Search',
        path: '/search',
        active: pathname === '/search',
        icons: [SearchActiveIcon, SearchIcon],
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
