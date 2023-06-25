import React, { useContext, useState, useEffect, memo } from 'react'
import styles from './Section.module.scss'
import classNames from 'classnames/bind'
import { SectionItemI } from '../../../types'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import SectionItem from '../SectionItem/SectionItem'
import Skeleton from 'react-loading-skeleton'
export interface SectionProps {
  title?: string
  data?: SectionItemI[]
}

const cx = classNames.bind(styles)

const Section: React.FC<SectionProps> = ({ title, data }) => {
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
            <a href="#">Show all</a>
          </>
        ) : (
          <Skeleton width={225} height={20} borderRadius={50} />
        )}
      </div>
      <div
        style={{
          gridTemplateColumns: `repeat(${Math.min(
            quantityCol,
            data?.length || 999
          )}, minmax(0,1fr))`,
          columnWidth: columnWidth,
          columnCount: Math.min(quantityCol, data?.length || 999),
        }}
        className={cx('body')}
      >
        {!isLoading ? data
          ?.slice(0, Math.min(quantityCol, data.length))
          .map((item, index) => (
            <SectionItem isLoading={isLoading} key={index} {...item} />
          )) : Array(quantityCol).fill(0).map((item, index) => (
            <SectionItem isLoading={isLoading} key={index} {...item} />
          ))}
      </div>
    </section>
  )
}

export default memo(Section)
