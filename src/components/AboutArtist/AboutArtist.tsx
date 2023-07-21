import { unicodeDecoder } from '@/utils'
import classNames from 'classnames/bind'
import { FC, memo, useContext } from 'react'
import styles from './AboutArtist.module.scss'
import { ArtistContext } from '@/contexts/ArtistContext'

const cx = classNames.bind(styles)

interface AboutArtistProps {
  stats?: any
  profile?: any
  visuals?: any
  isLoading?: boolean
  aboutImg?: string
}

const AboutArtist: FC<AboutArtistProps> = ({ profile, stats, isLoading, aboutImg }) => {
  const desc = unicodeDecoder(profile?.bio)
  const { setModalOpen } = useContext(ArtistContext)

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <h2>About</h2>
      </div>
      <div
        className={cx('body')}
        style={{ backgroundImage: `url(${aboutImg})` }}
        onClick={() => setModalOpen(true)}
      >
        <div className={cx('text-content')}>
          {!isLoading && (
            <>
              <div className={cx('monthly-listener')}>
                {stats?.monthlyListeners?.toLocaleString()} monthly listeners
              </div>
              <span
                className={cx('desc')}
                dangerouslySetInnerHTML={{ __html: desc }}
              ></span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(AboutArtist)
