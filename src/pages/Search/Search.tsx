import Navbar from '@/components/Navbar/Navbar'
import classNames from 'classnames/bind'
import React, { FC, useState } from 'react'
import styles from './Search.module.scss'
import Footer from '@/components/Footer/Footer'
import SearchBanner from '@/components/BannerSearch/SearchBanner'

const cx = classNames.bind(styles)

interface SearchProps {
  children?: React.ReactNode
}

const Search: FC<SearchProps> = () => {
  // const { children } = props
  const [query, setQuery] = useState<string>('')

  return (
    <div className={cx('search')}>
      <Navbar isSearch {...{ query, setQuery }} />
      <div className={cx('body')}>
        <SearchBanner />
        <Footer />
      </div>
    </div>
  )
}

export default Search
