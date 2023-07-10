import React from 'react'
import styles from './NotFound.module.scss'
import classNames from 'classnames/bind'
import logoImage from '@/assets/image/logo/logo.svg'
import { useDocumentTitle } from 'usehooks-ts'


const cx = classNames.bind(styles)

const NotFound: React.FC = () => {
  useDocumentTitle('Page not found')
  return (
    <div className={cx('wrapper')}>
      <div
        style={{ backgroundImage: `url(${logoImage})` }}
        className={cx('logo')}
      ></div>
      <div className={cx('body')}>
        <h2 className={cx('body__heading')}>Page not found</h2>
        <p className={cx('body__sub-heading')}>
          We can’t seem to find the page you are looking for.
        </p>
        <a href="/" className={cx('body__home-btn')}>
          Home
        </a>
        <a
          className={cx('body__help')}
          href="https://www.facebook.com/tuan204.dev"
          target="_blank"
        >
          Help
        </a>
      </div>
    </div>
  )
}

export default NotFound
