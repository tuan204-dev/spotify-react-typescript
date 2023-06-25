import React, { useContext } from 'react'
import styles from './Section.module.scss'
import classNames from 'classnames/bind'
import { SectionItemI } from '../../../types'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import SectionItem from '../SectionItem/SectionItem'
export interface SectionProps {
  title?: string
  data?: SectionItemI[]
}

const cx = classNames.bind(styles)

const Section: React.FC<SectionProps> = ({ title, data }) => {
  const { quantityCol, width } = useContext(MainLayoutContext)

  const columnWidth =
    (width - 2 * 24 - (quantityCol - 1) * 24) / quantityCol

  console.log(width, quantityCol)

  return (
    <section className={cx('wrapper')}>
      <div className={cx('header')}>
        <h2 className={cx('heading')}>{title}</h2>
        <a href="#">Show all</a>
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
        {data
          ?.slice(0, Math.min(quantityCol, data.length))
          .map((item, index) => (
            <SectionItem key={index} {...item} />
          ))}
      </div>
    </section>
  )
}

export default Section
