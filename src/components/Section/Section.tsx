/* eslint-disable react-refresh/only-export-components */
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import classNames from 'classnames/bind'
import React, { memo, useContext, useEffect, useMemo, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import SectionItem from '../SectionItem/SectionItem'
import styles from './Section.module.scss'
import { SectionProps } from '@/types/section'

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

  const sectionProps = useMemo(() => {
    if (data) {
      return data.map((item) => {
        return {
          id:
            (apiType === 'rapid' &&
              (item.uri?.split(':')[item.uri.split.length] ||
                item?.releases?.items[0].id)) ||
            item?.id,
          title:
            (apiType === 'rapid' &&
              (item?.profile?.name || item?.releases?.items[0].name)) ||
            item?.name,
          artists: item?.artists,
          desc:
            (apiType === 'spotify' && item?.description) ||
            (apiType === 'rapid' &&
              (item?.releases?.items[0].type || item?.description || item?.date?.year)),
          publisher: item?.publisher,
          imageUrl:
            (apiType === 'spotify' && item?.images?.[0]?.url) ||
            (apiType === 'rapid' &&
              (item?.images?.items?.[0]?.sources[0]?.url ||
                item?.coverArt?.sources[0]?.url ||
                item?.visuals?.avatarImage?.sources[0]?.url ||
                item?.releases?.items[0]?.coverArt?.sources[0]?.url)),
          dateAdd: item?.release_date,
          author:
            (item?.artists && item?.artists[0]?.name) ||
            (item?.owner && item?.owner?.display_name),
        }
      })
    }
  }, [data])

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
                  'un-clickable': !(
                    isClickable && (sectionProps?.length || 0) > quantityCol
                  ),
                })}
                to={
                  isClickable && (sectionProps?.length || 0) > quantityCol
                    ? `${href}`
                    : '#'
                }
              >
                <h2 className={cx({ heading: true })}>{title}</h2>
              </Link>
              {(sectionProps?.length || 0) > quantityCol && !isFull && isClickable && (
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
          columnCount: Math.min(quantityCol, sectionProps?.length || 999),
        }}
        className={cx('body')}
      >
        {!isLoading
          ? sectionProps
              ?.slice(
                0,
                isFull ? sectionProps.length : Math.min(quantityCol, sectionProps.length)
              )
              .map((item, index) => (
                <SectionItem
                  type={type}
                  dataType={dataType}
                  isLoading={isLoading}
                  key={item.id || index}
                  id={item.id}
                  title={item.title}
                  artists={item.artists}
                  desc={item.desc}
                  publisher={item.publisher}
                  imageUrl={item.imageUrl}
                  dateAdd={item.dateAdd}
                  author={item.author}
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
