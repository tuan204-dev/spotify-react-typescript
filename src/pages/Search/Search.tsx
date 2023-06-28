import classNames from 'classnames/bind'
import React, { FC, useState } from 'react'
import styles from './Search.module.scss'
import { Footer, Navbar, SearchBanner } from '@/components'

const cx = classNames.bind(styles)

interface SearchProps {
  children?: React.ReactNode
}

const Search: FC<SearchProps> = () => {
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
