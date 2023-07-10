import { FC, memo } from 'react'
import styles from './AboutArtist.module.scss'
import classNames from 'classnames/bind'
import { unicodeDecoder } from '@/utils'

const cx = classNames.bind(styles)

interface AboutArtistProps {
  stats?: any
  profile?: any
  visuals?: any
  isLoading?: boolean
}

const AboutArtist: FC<AboutArtistProps> = ({ profile, stats, visuals, isLoading }) => {
  const desc = unicodeDecoder(profile?.biography.text)

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <h2>About</h2>
      </div>
      <div
        className={cx('body')}
        style={{ backgroundImage: `url(${visuals?.gallery?.items[0]?.sources[0]?.url})` }}
      >
        <div className={cx('text-content')}>
          {!isLoading && (
            <>
              <div className={cx('monthly-listener')}>
                {stats?.monthlyListeners?.toLocaleString()} monthly listeners
              </div>
              <span className={cx('desc')}>{desc}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(AboutArtist)
