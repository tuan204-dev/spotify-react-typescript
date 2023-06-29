import {Fragment, FC} from 'react'
import { Link } from "react-router-dom"
import styles from './Artists.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface ArtistsProps {
  artists: any
}

const Artists: FC<ArtistsProps> = ({artists}) => {
  const renderData: any[] = []
  console.log(artists)
  if (artists) {
    if (artists.length === 1) {
      renderData.push(
        <Link key={0} to={`/artist?${artists[0].id}`}>
          <span className={cx('artist-item')}>{artists[0].name}</span>
        </Link>
      )
    } else {
      for (let i = 0; i < artists.length - 1; i++) {
        renderData.push(
          <Fragment key={i}>
            <Link to={`/artist?${artists[i].id}`}>
              <span className={cx('artist-item')}>{artists[i].name}</span>
            </Link>
            {', '}
          </Fragment>
        )
      }

      renderData.push(
        <Link
          key={artists.length - 1}
          to={`/artist?${artists[artists.length - 1].id}`}
        >
          <span className={cx('artist-item')}>
            {artists[artists.length - 1].name}
          </span>
        </Link>
      )
    }
  }

  return (
    <div className={cx('artists')}>
      {renderData}
    </div>
  )
}

export default Artists