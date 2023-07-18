import { FC, useContext } from 'react'
import styles from './Left.module.scss'
import classNames from 'classnames/bind'
import { SubTitle } from '@/components/UIs'
import { Link } from 'react-router-dom'
import { HeartIcon } from '@/assets/icons'
import { PlayerContext } from '@/contexts/PlayerContext'

const cx = classNames.bind(styles)

const Left: FC = () => {
  const { playBarData } = useContext(PlayerContext)

  return (
    <div className={cx('wrapper')}>
      <div className={cx('thumb')}>
        <img src={playBarData?.thumb} alt={playBarData?.trackName} />
      </div>
      <div className={cx('body')}>
        <div className={cx('name')}>
          <Link to={`/album/${playBarData?.albumId}`}>
            <span>{playBarData?.trackName}</span>
          </Link>
        </div>
        <div className={cx('artists')}>
          {
            <SubTitle
              fontSize={11}
              apiType="spotify"
              type="artist"
              data={playBarData?.artists}
            />
          }
        </div>
      </div>
      <div className={cx('icon')}>
        <HeartIcon size={16} />
      </div>
    </div>
  )
}

export default Left
