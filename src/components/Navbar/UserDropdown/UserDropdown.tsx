import { FC, useContext } from 'react'
import styles from './UserDropdown.module.scss'
import classNames from 'classnames/bind'
import { AuthContext } from '@/contexts/AuthContext'

const cx = classNames.bind(styles)

const UserDropdown: FC = () => {
  const { handleLogout } = useContext(AuthContext)

  return (
    <div className={cx('user-dropdown-wrapper')}>
      <button onClick={handleLogout} className={cx('logout-btn')}>
        Logout
      </button>
    </div>
  )
}

export default UserDropdown
