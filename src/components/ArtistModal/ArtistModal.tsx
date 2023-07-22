import { CloseIcon } from '@/assets/icons'
import classNames from 'classnames/bind'
import { FC, useEffect } from 'react'
import { ArtistProfile, ArtistStats } from '../../../types'
import ArtistCityStats from '../UIs/ArtistCityStats/ArtistCityStats'
import styles from './ArtistModal.module.scss'

const cx = classNames.bind(styles)

interface ArtistModalProps {
  profile: ArtistProfile
  aboutImg: string
  stats: ArtistStats
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ArtistModal: FC<ArtistModalProps> = ({
  profile,
  aboutImg,
  stats,
  setModalOpen,
}) => {
  const handleKeyPress = (e: any) => {
    if (e.code === 'Escape') {
      setModalOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => document.removeEventListener('keypress', handleKeyPress)
  }, [])

  return (
    <div
      className={cx('wrapper')}
      onClick={() => {
        setModalOpen(false)
      }}
    >
      <div className={cx('modal')} onClick={(e) => e.stopPropagation()}>
        <div className={cx('close-btn')} onClick={() => setModalOpen(false)}>
          <button>
            <CloseIcon />
          </button>
        </div>
        <div className={cx('main')}>
          <div className={cx('img')}>
            <img src={aboutImg} alt={profile?.name} />
          </div>
          <div className={cx('body')}>
            <div className={cx('left')}>
              <div className={cx('stats-listener')}>
                <div className={cx('quantity')}>{stats?.followers?.toLocaleString()}</div>
                <span className={cx('type')}>Followers</span>
              </div>
              <div className={cx('stats-listener')}>
                <div className={cx('quantity')}>
                  {stats?.monthlyListeners?.toLocaleString()}
                </div>
                <span className={cx('type')}>Monthly Listeners</span>
              </div>
              {stats?.topCities?.items?.map((item) => (
                <ArtistCityStats key={item?.city} {...item} />
              ))}
            </div>
            <div className={cx('right')}>
              <p
                className={cx('bio')}
                dangerouslySetInnerHTML={{
                  __html: profile?.biography?.text ? profile?.biography?.text : '',
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtistModal
