import classNames from 'classnames/bind'
import { HiArrowRight, HiOutlinePlus } from 'react-icons/hi'
import { TbPlaylist } from 'react-icons/tb'
import styles from './Library.module.scss'

const cx = classNames.bind(styles)

const Library = () => {
  const libSelection = [
    {
      name: 'Playlists',
    },
    {
      name: 'Artists',
    },
    {
      name: 'Albums',
    },
  ]

  return (
    <div className={cx('lib')}>
      <div className={cx('playlist')}>
        <div className={cx('playlist-header')}>
          <div className={cx('playlist-header-icon')}>
            <TbPlaylist />
          </div>
          <p className={cx('playlist-header-text')}>Your Library</p>
        </div>
        <div className={cx('playlist-button')}>
          <button>
            <HiOutlinePlus size={22} />
          </button>
          <button>
            <HiArrowRight />
          </button>
        </div>
      </div>

      <div className={cx('selection')}>
        {libSelection.map((item, index) => (
          <button key={index}>{item.name}</button>
        ))}
      </div>
    </div>
  )
}

export default Library
