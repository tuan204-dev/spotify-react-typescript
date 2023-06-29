import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import classNames from 'classnames/bind'
import React, { memo, useContext, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import SectionItem from '../SectionItem/SectionItem'
import styles from './Section.module.scss'
export interface SectionProps {
  title?: string
  href?: string
  data?: any[]
  isFull?: boolean
  dataType?: string
}

const cx = classNames.bind(styles)

const Section: React.FC<SectionProps> = ({
  title,
  href,
  data,
  isFull = false,
  dataType,
}) => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const { quantityCol, width } = useContext(MainLayoutContext)

  const columnWidth =
    (width - 2 * 24 - (quantityCol - 1) * 24) / quantityCol

  // console.log(width, quantityCol)
  // console.log(data)

  useEffect(() => {
    // setTimeout(() => {
    //   setLoading(Boolean(!data))
    // }, 500)
    setLoading(Boolean(!data))
  }, [data])


  return (
    <section className={cx('wrapper')}>
      <div className={cx('header')}>
        {!isLoading ? (
          <>
            <Link to={`${href}`}>
              <h2 className={cx('heading')}>{title}</h2>
            </Link>
            {(data?.length || 0) > quantityCol && !isFull && (
              <Link to={`${href}`}>Show all</Link>
            )}
          </>
        ) : (
          <Skeleton width={225} height={20} borderRadius={50} />
        )}
      </div>
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
                dataType={dataType}
                isLoading={isLoading}
                key={index}
                id={item.id}
                title={item.name}
                imageUrl={item?.images[0]?.url}
                author={
                  (item?.artists && item?.artists.name) ||
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
                    key={index}
                    id={item.id}
                    title={item.name}
                    imageUrl={item?.images[0]?.url}
                    author={
                      (item?.artists && item?.artists.name) ||
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
