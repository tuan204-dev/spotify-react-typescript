import {FC} from 'react'
import styles from './LoadingLayout.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const LoadingLayout: FC = () => {
  return (
    <div className={cx('wrapper')}>
      Loading
    </div>
  )
}

export default LoadingLayout