import classNames from 'classnames/bind'
import { HiArrowRight, HiOutlinePlus } from 'react-icons/hi'
import styles from './Library.module.scss'
import { useEffect, useState } from 'react'
import { LibraryIcon } from '@/assets/icons'
// import { AlbumItem, ArtistItem, PlayListItem } from '../../../../types'
import { SidebarItem } from '@/components'

const cx = classNames.bind(styles)

type LibSelection = Array<{ name: string; id: string }>

const Library = () => {
  const [category, setCategory] = useState<{ name: string; id: string }>({
    name: 'Playlists',
    id: '00003',
  })
  const [renderData, setRenderData] = useState<[]>([])
  const [bottomShadow, setBottomShadow] = useState<boolean>(false)


  const libSelection: LibSelection = [
    {
      name: 'Playlists',
      id: '00003',
    },
    {
      name: 'Artists',
      id: '00004',
    },
    {
      name: 'Albums',
      id: '00005',
    },
  ]

  const handleClick = (selection: { name: string; id: string }): void => {
    setCategory((prev) => {
      return { ...prev, ...selection }
    })
  }

  const handleScroll = (
    e: React.UIEvent<HTMLDivElement, UIEvent>
  ): void => {
    const yAxis = e.currentTarget.scrollTop

    // console.log(yAxis)
    if (yAxis > 0) {
      setBottomShadow(true)
    } else {
      setBottomShadow(false)
    }
  }

  useEffect(() => {
    (async () => {
      const response = await fetch(`data/${category.id}.json`)
      const data = await response.json()
      // console.log(data)
      setRenderData(
        () => {
          if (category.name === 'Playlists') {
            return data.data.map((item: any, index: number) => (
              <SidebarItem
                key={index}
                id={item.id}
                author={item.owner.display_name}
                type="playlist"
                name={item.name}
                thumbnail={item.images[0].url}
              />
            ))
          }

          if (category.name === 'Artists') {
            return data.data.map((item: any, index: number) => (
              <SidebarItem
                key={index}
                id={item.id}
                type="artist"
                name={item.name}
                thumbnail={item.images[0].url}
              />
            ))
          }
          if (category.name === 'Albums') {
            return data.data.map((item: any, index: number) => (
              <SidebarItem
                key={index}
                id={item.id}
                artists={item.artists}
                type="album"
                name={item.name}
                thumbnail={item.images[0].url}
              />
            ))
          }
        }
      )
    })()
  }, [category])

  return (
    <div className={cx('lib')}>
      <div className={cx('playlist')}>
        <div className={cx('playlist-header')}>
          <div className={cx('playlist-header-icon')}>
            <LibraryIcon />
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

      <div
        className={cx({ selection: true, 'bottom-shadow': bottomShadow })}
      >
        {libSelection.map((item, index) => (
          <button onClick={() => handleClick(item)} key={index}>
            {item.name}
          </button>
        ))}
      </div>
      <div
        onScroll={(e) => handleScroll(e)}
        className={cx('playlist-section')}
      >
        {renderData}
      </div>
    </div>
  )
}

export default Library
