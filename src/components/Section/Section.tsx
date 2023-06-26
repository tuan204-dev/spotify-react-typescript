import React, { useContext, useState, useEffect, memo } from 'react'
import styles from './Section.module.scss'
import classNames from 'classnames/bind'
import { SectionItemI } from '../../../types'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import SectionItem from '../SectionItem/SectionItem'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
export interface SectionProps {
  title?: string
  id?: string
  data?: SectionItemI[]
  isFull?: boolean
}

const cx = classNames.bind(styles)

const Section: React.FC<SectionProps> = ({
  title,
  id,
  data,
  isFull = false,
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

  // console.log(isLoading)

  return (
    <section className={cx('wrapper')}>
      <div className={cx('header')}>
        {!isLoading ? (
          <>
            <h2 className={cx('heading')}>{title}</h2>
            {(data?.length || 0) > quantityCol && !isFull && (
              <Link to={`/section?${id}`}>Show all</Link>
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
                <SectionItem kind={title?.toLocaleLowerCase()} isLoading={isLoading} key={index} {...item} />
              ))
            : data
                ?.slice(0, Math.min(quantityCol, data.length))
                .map((item, index) => (
                  <SectionItem kind={title?.toLocaleLowerCase()}
                    isLoading={isLoading}
                    key={index}
                    {...item}
                  />
                ))
          : Array(quantityCol)
              .fill(0)
              .map((item, index) => (
                <SectionItem kind={title?.toLocaleLowerCase()} isLoading={isLoading} key={index} {...item} />
              ))}
      </div>
    </section>
  )
}

export default memo(Section)
