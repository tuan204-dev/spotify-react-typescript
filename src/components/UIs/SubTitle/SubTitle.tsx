/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames/bind'
import { FC, Fragment } from 'react'
import { Link } from 'react-router-dom'
import styles from './SubTitle.module.scss'

const cx = classNames.bind(styles)

interface ArtistsProps {
  data: any
  isWhiteColor?: boolean
  type?: 'artist' | 'album' | 'show'
  apiType?: 'spotify' | 'rapid'
  fontSize?: number
}

const Artists: FC<ArtistsProps> = ({
  data,
  isWhiteColor,
  type = 'artist',
  fontSize,
  apiType = 'spotify',
}) => {
  const renderData: any[] = []
  let dataNormalized: any

  if (apiType === 'rapid') {
    if (type === 'artist') {
      dataNormalized = data?.items?.map((item: any) => {
        return {
          id: item.uri.split(':').pop(),
          name: item.profile.name,
        }
      })
    }
  } else {
    dataNormalized = data
  }

  if (dataNormalized) {
    if (dataNormalized.length === 1) {
      renderData.push(
        <Link
          key={0}
          to={
            // type === 'album'
            //   ? `/album/${dataNormalized[0]?.id}`
            //   : `/artist/${dataNormalized[0]?.id}`
            (type === 'album' && `/album/${dataNormalized?.[0]?.id}`) ||
            (type === 'artist' && `/artist/${dataNormalized?.[0]?.id}`) ||
            (type === 'show' && `/show/${dataNormalized?.[0]?.id}`) ||
            ''
          }
        >
          <span
            style={{ fontSize: fontSize ? fontSize : undefined }}
            className={cx({ 'artist-item': true, 'white-color': isWhiteColor })}
          >
            {dataNormalized?.[0]?.name}
          </span>
        </Link>
      )
    } else {
      for (let i = 0; i < dataNormalized.length - 1; i++) {
        renderData.push(
          <Fragment key={i}>
            <Link
              to={
                type === 'album'
                  ? `/album/${dataNormalized[i]?.id}`
                  : `/artist/${dataNormalized[i]?.id}`
              }
            >
              <span
                style={{ fontSize: fontSize ? fontSize : undefined }}
                className={cx({
                  'artist-item': true,
                  'white-color': isWhiteColor,
                })}
              >
                {dataNormalized[i]?.name}
              </span>
            </Link>
            {', '}
          </Fragment>
        )
      }

      renderData.push(
        <Fragment key={dataNormalized?.length - 1}>
          <Link
            to={
              type === 'album'
                ? `/album/${dataNormalized[dataNormalized?.length - 1]?.id}`
                : `/artist/${dataNormalized[dataNormalized?.length - 1]?.id}`
            }
          >
            <span
              style={{ fontSize: fontSize ? fontSize : undefined }}
              className={cx({
                'artist-item': true,
                'white-color': isWhiteColor,
              })}
            >
              {dataNormalized[dataNormalized?.length - 1]?.name}
            </span>
          </Link>
        </Fragment>
      )
    }
  }

  return (
    <div onClick={(e) => e.stopPropagation()} className={cx('artists')}>
      {renderData}
    </div>
  )
}

export default Artists
