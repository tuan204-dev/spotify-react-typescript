import Navbar from '@/components/Navbar/Navbar'
import classNames from 'classnames/bind'
import React, { FC, useState } from 'react'
import styles from './Search.module.scss'
import Footer from '@/components/Footer/Footer'

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
        <div style={{ minHeight: '2000px', background: '#121212' }}></div>
        <Footer />
      </div>
    </div>
  )
}

export default Search
