import {Fragment, FC} from 'react'
import { Link } from "react-router-dom"
import styles from './Artists.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface ArtistsProps {
  data: any
}

const Artists: FC<ArtistsProps> = ({data}) => {
  const renderData: any[] = []
  console.log(data)
  if (data) {
    if (data.length === 1) {
      renderData.push(
        <Link key={0} to={`/artist?${data[0].id}`}>
          <span className={cx('artist-item')}>{data[0].name}</span>
        </Link>
      )
    } else {
      for (let i = 0; i < data.length - 1; i++) {
        renderData.push(
          <Fragment key={i}>
            <Link to={`/artist?${data[i].id}`}>
              <span className={cx('artist-item')}>{data[i].name}</span>
            </Link>
            {', '}
          </Fragment>
        )
      }

      renderData.push(
        <Link
          key={data.length - 1}
          to={`/artist?${data[data.length - 1].id}`}
        >
          <span className={cx('artist-item')}>
            {data[data.length - 1].name}
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