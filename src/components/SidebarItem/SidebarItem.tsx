import classNames from 'classnames/bind'
import { FC } from 'react'
import styles from './SidebarItem.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

interface SidebarItemProps {
  author?: string
  type?: 'playlist' | 'artist' | 'album'
  thumbnail?: string | undefined
  name?: string | undefined
  id?: string

}

const SidebarItem: FC<SidebarItemProps> = (props) => {
  const {type, thumbnail, name, author, id} = props

  const newType = (() => {
    if(type === 'playlist') return author
    if(type === 'artist') return 'Artist'
    if(type === 'album') return author
  })()

  return (
    <Link to={`/${type}?${id}`}>
      <div className={cx('sidebar-item')}>
        <img loading='lazy' src={thumbnail} className={cx('thumbnail')}/>
        <div className={cx('body')}>
          <h4 className={cx('heading')}>{name}</h4>
          <span className={cx('type')}>
            {newType}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default SidebarItem