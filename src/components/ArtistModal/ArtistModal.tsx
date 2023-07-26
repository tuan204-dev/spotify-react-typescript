import { CloseIcon } from '@/assets/icons'
import classNames from 'classnames/bind'
import { FC, useEffect, useRef, useState } from 'react'
import ArtistCityStats from '../UIs/ArtistCityStats/ArtistCityStats'
import styles from './ArtistModal.module.scss'
import { ArtistProfile, ArtistStats } from '@/types/artist'

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
  const timeoutId = useRef<any>()
  const [isClose, setClose] = useState<boolean>(false)

  const handleKeyPress = (e: any) => {
    if (e.code === 'Escape') {
      handleClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      clearTimeout(timeoutId.current)
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [])

  const handleClose = () => {
    setClose(true)
    timeoutId.current = setTimeout(() => {
      setModalOpen(false)
    }, 400)
  }

  return (
    <div className={cx({ wrapper: true, close: isClose })} onClick={handleClose}>
      <div className={cx({ modal: true })} onClick={(e) => e.stopPropagation()}>
        <div className={cx('close-btn')} onClick={handleClose}>
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
