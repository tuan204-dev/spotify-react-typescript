import React, { useEffect, useState, useContext, useMemo } from 'react'
import styles from './SearchBanner.module.scss'
import classNames from 'classnames/bind'
import { SearchBannerItem } from './../../../types'
import BannerItem from './BannerItem/BannerItem'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'

const cx = classNames.bind(styles)

const SearchBanner: React.FC = () => {
  const [data, setData] = useState<SearchBannerItem[]>([])
  const [quantityCol, setQuantityCol] = useState<number>(9)

  const { width } = useContext(MainLayoutContext)

  useEffect(() => {
    if (width < 1850) setQuantityCol(8)
    if (width < 1650) setQuantityCol(7)
    if (width < 1450) setQuantityCol(6)
    if (width < 1250) setQuantityCol(5)
    if (width < 1000) setQuantityCol(4)
    if (width < 700) setQuantityCol(3)
    if (width < 500) setQuantityCol(2)
  }, [width])


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/bannerSearch.json')
      const data = await response.json()
      setData(data)
    }

    fetchData()
  }, [])

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('heading')}>Browse all</h2>
      <div
        style={{ gridTemplateColumns: `repeat(${quantityCol}, 1fr)` }}
        className={cx('body')}
      >
        {data.map((item, index) => (
          <BannerItem
            title={item.title}
            imageUrl={item.imageUrl}
            bgColor={item.bgColor}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchBanner
