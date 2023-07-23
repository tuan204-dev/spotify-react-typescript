import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import classNames from 'classnames/bind'
import React, { useContext, useEffect, useState } from 'react'
import BannerItem from './BannerItem/BannerItem'
import styles from './SearchBanner.module.scss'
import { SearchBannerItem } from '@/types/search'

const cx = classNames.bind(styles)

const SearchBanner: React.FC = () => {
  const [data, setData] = useState<SearchBannerItem[]>([])
  const { quantityCol } = useContext(MainLayoutContext)

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

export default React.memo(SearchBanner)
