import { FC } from 'react'
import styles from './LoadingLayout.module.scss'
import classNames from 'classnames/bind'
import { StageSpinner } from 'react-spinners-kit'

const cx = classNames.bind(styles)

const LoadingLayout: FC = () => {
  return (
    <div className={cx('wrapper')}>
      <StageSpinner size={100} color="#333" />
    </div>
  )
}

export default LoadingLayout
