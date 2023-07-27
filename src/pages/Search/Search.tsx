import { Footer, Navbar, SearchBanner, SearchResult } from '@/components'
import { PlayerContext } from '@/contexts/PlayerContext'
import { SearchContext } from '@/contexts/SearchContext'
import { documentTitle } from '@/utils'
import classNames from 'classnames/bind'
import React, { FC, useContext, useEffect, useState } from 'react'
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

interface SearchProps {
  children?: React.ReactNode
}

const Search: FC<SearchProps> = () => {
  const { setQuery: setSearchQuery, query: searchQuery } = useContext(SearchContext)
  const { isPlaying, prevDocumentTitle } = useContext(PlayerContext)
  const [query, setQuery] = useState<string | undefined>(searchQuery)
  const [debounceValue, setDebounceValue] = useState<string | undefined>(searchQuery)

  useEffect(() => {
    if (isPlaying) {
      prevDocumentTitle.current = 'Spotify – Search'
    } else {
      documentTitle('Spotify – Search')
    }
  }, [isPlaying])

  useEffect(() => {
    let timeoutId: any
    if (!query?.trim()) {
      setDebounceValue('')
    } else {
      timeoutId = setTimeout(() => {
        setDebounceValue(query?.trim())
      }, 500)
    }

    return () => clearTimeout(timeoutId)
  }, [query])

  useEffect(() => {
    setSearchQuery(debounceValue)
  }, [debounceValue])

  return (
    <div className={cx('search')}>
      <Navbar type="search" {...{ query, setQuery }} />
      <div className={cx('body')}>
        {debounceValue && <SearchResult />}
        <div style={{ display: debounceValue && 'none' }}>
          <SearchBanner />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Search
