/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames/bind'
import { FC, Fragment } from 'react'
import { Link } from 'react-router-dom'
import styles from './SubTitle.module.scss'

const cx = classNames.bind(styles)

interface ArtistsProps {
  data: any
  isWhiteColor?: boolean
  type?: 'artist' | 'album'
  apiType?: 'spotify' | 'rapid'
  fontSize?: number
}

const Artists: FC<ArtistsProps> = ({ data, isWhiteColor, type = 'artist', fontSize }) => {
  const renderData: any[] = []
  if (data) {
    if (data.length === 1) {
      renderData.push(
        <Link
          key={0}
          to={type === 'album' ? `/album/${data[0]?.id}` : `/artist/${data[0]?.id}`}
        >
          <span
            style={{ fontSize: fontSize ? fontSize : undefined }}
            className={cx({ 'artist-item': true, 'white-color': isWhiteColor })}
          >
            {data[0].name}
          </span>
        </Link>
      )
    } else {
      for (let i = 0; i < data.length - 1; i++) {
        renderData.push(
          <Fragment key={i}>
            <Link
              to={type === 'album' ? `/album/${data[i]?.id}` : `/artist/${data[i]?.id}`}
            >
              <span
                style={{ fontSize: fontSize ? fontSize : undefined }}
                className={cx({
                  'artist-item': true,
                  'white-color': isWhiteColor,
                })}
              >
                {data[i]?.name}
              </span>
            </Link>
            {', '}
          </Fragment>
        )
      }

      renderData.push(
        <Fragment key={data?.length - 1}>
          <Link
            to={
              type === 'album'
                ? `/album/${data[data?.length - 1]?.id}`
                : `/artist/${data[data?.length - 1]?.id}`
            }
          >
            <span
              style={{ fontSize: fontSize ? fontSize : undefined }}
              className={cx({
                'artist-item': true,
                'white-color': isWhiteColor,
              })}
            >
              {data[data?.length - 1]?.name}
            </span>
          </Link>
        </Fragment>
      )
    }
  }

  return <div className={cx('artists')}>{renderData}</div>
}

export default Artists
