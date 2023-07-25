import classNames from 'classnames/bind'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Image, SubTitle, ThumbDefault } from '../UIs'
import styles from './SidebarItem.module.scss'
import { SidebarItemProps } from '@/types/sidebar'

const cx = classNames.bind(styles)

const SidebarItem: FC<SidebarItemProps> = (props) => {
  const { type, thumbnail, name, author, id, artists } = props

  const newType = (() => {
    if (type === 'playlist') return author
    if (type === 'artist') return 'Artist'
    if (type === 'album' && artists) return <SubTitle data={artists} />
  })()

  return (
    <div>
      <Link to={`/${type}/${id}`}>
        <div className={cx('sidebar-item')}>
          <div className={cx('thumbnail')}>
            {thumbnail ? <Image src={thumbnail} alt={name} /> : <ThumbDefault />}
          </div>
          <div className={cx('body')}>
            <h4 className={cx('heading')}>{name}</h4>
            <span className={cx('type')}>{newType}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SidebarItem
