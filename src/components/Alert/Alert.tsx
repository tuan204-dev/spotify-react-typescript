import React, { useMemo } from 'react'
import styles from './Alert.module.scss'
import classNames from 'classnames/bind'
import logoImage from '@/assets/image/logo/logo.svg'
import { useDocumentTitle } from 'usehooks-ts'

const cx = classNames.bind(styles)

interface AlertProps {
  type?: 'notfound' | 'wrong' | 'noSupportDevice'
}

const Alert: React.FC<AlertProps> = (props) => {
  const { type = 'notfound' } = props

  const { documentTitle, message } = useMemo(() => {
    switch (type) {
      case 'notfound':
        return {
          documentTitle: 'Page not found',
          message: `We can't seem to find the page you are looking for.`,
        }
      case 'wrong':
        return {
          documentTitle: 'Oops!',
          message: `Sorry, we couldn't complete your request.\n Please try refreshing this page or contact us.`,
        }
      case 'noSupportDevice':
        return {
          documentTitle: 'Unsupported device!',
          message: 'Desktop supported only!',
        }
    }
  }, [type])

  useDocumentTitle(documentTitle)
  return (
    <div className={cx('wrapper')}>
      <div style={{ backgroundImage: `url(${logoImage})` }} className={cx('logo')}></div>
      <div className={cx('body')}>
        <h2 className={cx('body__heading')}>
          {type === 'notfound' ? 'Page not found' : 'Oops! Something went wrong'}
        </h2>
        <p className={cx('body__sub-heading')}>{message}</p>
        {type !== 'noSupportDevice' && (
          <a href="/" className={cx('body__home-btn')}>
            Home
          </a>
        )}
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

export default Alert
