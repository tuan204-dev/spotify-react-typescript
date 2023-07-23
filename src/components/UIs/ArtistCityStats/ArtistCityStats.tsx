import { FC } from 'react'
import styles from './ArtistCityStats.module.scss'
import classNames from 'classnames/bind'
import { ArtistTopCity } from '@/types/artist'

const cx = classNames.bind(styles)

const ArtistCityStats: FC<ArtistTopCity> = ({ city, country, numberOfListeners }) => {
  return (
    <div className={cx('wrapper')}>
      <h4 className={cx('city')}>{`${city}, ${country}`}</h4>
      <span className={cx('number-of-listeners')}>{`${numberOfListeners?.toLocaleString()} listeners`}</span>
    </div>
  )
}

export default ArtistCityStats
