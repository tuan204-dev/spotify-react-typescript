import classNames from 'classnames/bind'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Image, SubTitle } from '../UIs'
import styles from './SidebarItem.module.scss'

const cx = classNames.bind(styles)

interface SidebarItemProps {
  author?: string
  type?: 'playlist' | 'artist' | 'album'
  thumbnail?: string | undefined
  name?: string | undefined
  id?: string
  artists?: any
}

const SidebarItem: FC<SidebarItemProps> = (props) => {
  const { type, thumbnail, name, author, id, artists } = props

  const newType = (() => {
    if (type === 'playlist') return author
    if (type === 'artist') return 'Artist'
    if (type === 'album' && artists) return <SubTitle data={artists} />
  })()

  return (
    <Link to={`/${type}/${id}`}>
      <div className={cx('sidebar-item')}>
        <div className={cx('thumbnail')}>
          <Image src={thumbnail} alt={name} />
        </div>
        <div className={cx('body')}>
          <h4 className={cx('heading')}>{name}</h4>
          <span className={cx('type')}>{newType}</span>
        </div>
      </div>
    </Link>
  )
}

export default SidebarItem
