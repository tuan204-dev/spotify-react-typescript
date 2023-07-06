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
    let timeoutId: any
    if (!query.trim()) {
      setDebounceValue('')
    } else {
      timeoutId = setTimeout(() => {
        setDebounceValue(query.trim())
      }, 500)
    }

    return () => clearTimeout(timeoutId)
  }, [query])

  return (
    <div className={cx('search')}>
      <Navbar type='search' {...{ query, setQuery }} />
      <div className={cx('body')}>
        {debounceValue && (
          <>
            <SearchResult query={debounceValue} />
          </>
        )}
        <div style={{ display: debounceValue && 'none' }}>
          <SearchBanner />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Search
