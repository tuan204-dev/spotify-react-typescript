import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import classNames from 'classnames/bind'
import React, { memo, useContext, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import SectionItem from '../SectionItem/SectionItem'
import styles from './Section.module.scss'
import { SectionProps } from '../../../types'

const cx = classNames.bind(styles)

const Section: React.FC<SectionProps> = ({
  title,
  href,
  data,
  isFull = false,
  dataType,
  isClickable = true,
  hideHeader = false,
  type = 'default',
  apiType,
}) => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const { quantityCol, width } = useContext(MainLayoutContext)

  const columnWidth = (width - 2 * 24 - (quantityCol - 1) * 24) / quantityCol

  useEffect(() => {
    setLoading(Boolean(!data))
  }, [data])

  return (
    <section className={cx({ wrapper: true })}>
      {!hideHeader && (
        <div className={cx('header')}>
          {!isLoading ? (
            <>
              <Link
                className={cx({
                  'is-search': !isClickable,
                })}
                to={isClickable ? `${href}` : '#'}
              >
                <h2 className={cx({ heading: true })}>{title}</h2>
              </Link>
              {(data?.length || 0) > quantityCol && !isFull && isClickable && (
                <Link to={`${href}`}>Show all</Link>
              )}
            </>
          ) : (
            <Skeleton width={225} height={20} borderRadius={50} />
          )}
        </div>
      )}
      <div
        style={{
          gridTemplateColumns: `repeat(${quantityCol}, minmax(0,1fr))`,
          columnWidth: columnWidth,
          columnCount: Math.min(quantityCol, data?.length || 999),
        }}
        className={cx('body')}
      >
        {!isLoading
          ? isFull
            ? data?.map((item, index) => (
                <SectionItem
                  type={type}
                  dataType={dataType}
                  isLoading={isLoading}
                  key={item.id || index}
                  id={item?.id || item.uri?.split(':')[item.uri.split.length]}
                  title={item?.name || item?.profile.name}
                  artists={item?.artists}
                  desc={
                    (type === 'artist' && item?.releases?.items[0].type) ||
                    (apiType === 'spotify' && item?.description)
                  }
                  publisher={item?.publisher}
                  imageUrl={
                    (type === 'artist' &&
                      (item?.visuals?.avatarImage?.sources[0]?.url ||
                        item?.releases?.items[0]?.coverArt?.sources[0]?.url ||
                        (apiType === 'spotify' && item?.images[0]?.url) ||
                        (apiType === 'rapid' &&
                          (item?.images?.items[0]?.sources[0]?.url ||
                            item?.visuals?.avatarImage?.sources[0]?.url)))) ||
                    (apiType === 'spotify' && item?.images[0]?.url) ||
                    (apiType === 'rapid' &&
                      (item?.images?.items[0]?.sources[0]?.url ||
                        item?.visuals?.avatarImage?.sources[0]?.url))
                  }
                  dateAdd={item?.release_date}
                  author={
                    (item?.artists && item?.artists[0]?.name) ||
                    (item?.owner && item?.owner.display_name)
                  }
                />
              ))
            : data
                ?.slice(0, Math.min(quantityCol, data.length))
                .map((item, index) => (
                  <SectionItem
                    dataType={dataType}
                    isLoading={isLoading}
                    key={item.id || index}
                    id={
                      (type === 'artist' &&
                        (item.uri?.split(':')[item.uri.split.length] ||
                          item?.releases?.items[0].id)) ||
                      item?.id
                    }
                    title={
                      (type === 'artist' &&
                        (item?.profile?.name || item?.releases?.items[0].name)) ||
                      item?.name
                    }
                    artists={item?.artists}
                    desc={
                      (type === 'artist' && item?.releases?.items[0].type) ||
                      (apiType === 'spotify' && item?.description)
                    }
                    publisher={item?.publisher}
                    imageUrl={
                      (type === 'artist' &&
                        (item?.visuals?.avatarImage?.sources[0]?.url ||
                          item?.releases?.items[0]?.coverArt?.sources[0]?.url ||
                          (apiType === 'spotify' && item?.images[0]?.url) ||
                          (apiType === 'rapid' &&
                            item?.images?.items[0]?.sources[0]?.url))) ||
                      (apiType === 'spotify' && item?.images[0]?.url) ||
                      (apiType === 'rapid' && item?.images?.items[0]?.sources[0]?.url)
                    }
                    dateAdd={item?.release_date}
                    author={
                      (item?.artists && item?.artists[0]?.name) ||
                      (item?.owner && item?.owner.display_name)
                    }
                  />
                ))
          : Array(quantityCol)
              .fill(0)
              .map((item, index) => (
                <SectionItem
                  dataType={dataType}
                  isLoading={isLoading}
                  key={index}
                  {...item}
                />
              ))}
      </div>
    </section>
  )
}

export default memo(Section)
