import {FC} from 'react'
import styles from './SearchNotFound.module.scss'
import classNames from 'classnames/bind'
import { Footer } from '@/components'

const cx = classNames.bind(styles)

interface SearchNotFoundProps {
  query?: string
}

const SearchNotFound: FC<SearchNotFoundProps> = ({query}) => {
  return (
    <div
      className={cx('wrapper')}
    >
      <div className={cx('not-found')}>
        <p className={cx('title')}>{`No results found for "${query}"`}</p>
        <span className={cx('msg')}>
          Please make sure your words are spelled correctly, or use fewer or different
          keywords.
        </span>
      </div>
      <Footer />
    </div>
  )
}

export default SearchNotFound
