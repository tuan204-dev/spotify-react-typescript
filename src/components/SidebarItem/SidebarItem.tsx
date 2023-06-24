import classNames from 'classnames/bind'
import { FC } from 'react'
import styles from './SidebarItem.module.scss'

const cx = classNames.bind(styles)

interface SidebarItemProps {
  type: 'playlist' | 'artist' | 'album'
  thumbnail: string | undefined
  name: string | undefined

}

const SidebarItem: FC<SidebarItemProps> = (props) => {
  const {type, thumbnail, name} = props

  const newType = (() => {
    if(type === 'playlist') return 'Playlist'
    if(type === 'artist') return 'Artist'
    if(type === 'album') return 'Album'
  })()

  return (
    <div className={cx('sidebar-item')}>
      <img loading='lazy' src={thumbnail} className={cx('thumbnail')}/>
      <div className={cx('body')}>
        <h4 className={cx('heading')}>{name}</h4>
        <span className={cx('type')}>
          {newType}
        </span>
      </div>
    </div>
  )
}

export default SidebarItem