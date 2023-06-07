import classNames from 'classnames/bind'
import { HiArrowRight, HiOutlinePlus } from 'react-icons/hi'
import { TbPlaylist } from 'react-icons/tb'
import styles from './Library.module.scss'
import SidebarItem from '@/components/SidebarItem/SidebarItem'
import { useEffect, useState } from 'react'

const cx = classNames.bind(styles)

type LibSelection = Array<{ name: string }>

const Library = () => {
  const [category, setCategory] = useState<string>('Playlists')
  const libSelection: LibSelection = [
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

  const handleClick = (type: string): void => {
    setCategory(type)
  }

  const [data, setData] = useState<[]>([])
  const [renderData, setRenderData] = useState<[]>([])

  useEffect(() => {
    (async () => {
      const response = await fetch(`data/init${category}.json`)
      const data = await response.json()
      // setData(data.playlists.items)
      setRenderData(
        data[`${category.toLowerCase()}`].items.map(
          (item: any, index: number) => {
            if (category === 'Playlists') {
              return (
                <SidebarItem
                  key={index}
                  type="playlist"
                  name={item.data.name}
                  thumbnail={item.data.images.items[0].sources[0].url}
                />
              )
            }

            if (category === 'Artists') {
              return (
                <SidebarItem
                  key={index}
                  type="playlist"
                  name={item.data.profile.name}
                  thumbnail={item.data.visuals.avatarImage.sources[0].url}
                />
              )
            }

            if (category === 'Albums') {
              return (
                <SidebarItem
                  key={index}
                  type="playlist"
                  name={item.data.name}
                  thumbnail={item.data.coverArt.sources[0].url}
                />
              )
            }
          }
        )
      )
    })()
  }, [category])

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
          <button onClick={() => handleClick(item.name)} key={index}>
            {item.name}
          </button>
        ))}
      </div>
      <div className={cx('playlist-section')}>{renderData}</div>
    </div>
  )
}

export default Library
