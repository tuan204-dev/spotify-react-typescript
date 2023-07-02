import { Footer, Navbar, SearchBanner, SearchResult } from '@/components'
import classNames from 'classnames/bind'
import React, { FC, useEffect, useState } from 'react'
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

interface SearchProps {
  children?: React.ReactNode
}

const Search: FC<SearchProps> = () => {
  const [query, setQuery] = useState<string>('')
  const [debounceValue, setDebounceValue] = useState<string>('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(query)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [query])

  return (
    <div className={cx('search')}>
      <Navbar isSearch {...{ query, setQuery }} />
      <div className={cx('body')}>
        {debounceValue ? (
          <>
            <SearchResult query={debounceValue} />
          </>
        ) : (
          <>
            <SearchBanner />
            <Footer />
          </>
        )}
      </div>
    </div>
  )
}

export default Search
