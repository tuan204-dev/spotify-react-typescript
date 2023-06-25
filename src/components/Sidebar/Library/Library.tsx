import classNames from 'classnames/bind'
import { HiArrowRight, HiOutlinePlus } from 'react-icons/hi'
import styles from './Library.module.scss'
import SidebarItem from '@/components/SidebarItem/SidebarItem'
import { useEffect, useState } from 'react'
import { LibraryIcon } from '@/assets/icons'
import { AlbumItem, ArtistItem, PlayListItem } from '../../../../types'

const cx = classNames.bind(styles)

type LibSelection = Array<{ name: string }>

const Library = () => {
  const [category, setCategory] = useState<string>('Playlists')
  // const [data, setData] = useState<[]>([])
  const [renderData, setRenderData] = useState<[]>([])
  const [bottomShadow, setBottomShadow] = useState<boolean>(false)

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
      const response = await fetch(`data/init${category}.json`)
      const data = await response.json()
      // setData(data.playlists.items)
      setRenderData(
        // if(category === 'Playlists') {
        //   data.map((item, index) => ())
        // }
        () => {
          if (category === 'Playlists') {
            return data.data.map((item: PlayListItem, index: number) => (
              <SidebarItem
                key={index}
                author={item.author}
                type="playlist"
                name={item.title}
                thumbnail={item.imageUrl}
              />
            ))
          }

          if (category === 'Artists') {
            return data.data.map((item: ArtistItem, index: number) => (
              <SidebarItem
                key={index}
                type="artist"
                name={item.name}
                thumbnail={item.imageUrl}
              />
            ))
          }
          if (category === 'Albums') {
            return data.data.map((item: AlbumItem, index: number) => (
              <SidebarItem
                author={item.author}
                key={index}
                type="album"
                name={item.title}
                thumbnail={item.imageUrl}
              />
            ))
          }
        }
        // data.map(
        //   (item: any, index: number) => {
        //     if (category === 'Playlists') {
        //       return (
        //         <SidebarItem
        //           key={index}
        //           author={item.author}
        //           type="playlist"
        //           name={item.title}
        //           thumbnail={item.imageUrl}
        //         />
        //       )
        //     }

        //     if (category === 'Artists') {
        //       return (
        //         <SidebarItem
        //           key={index}
        //           type="artist"
        //           name={
        //             item.name
        //           }
        //           thumbnail={
        //             item.imageUrl
        //           }
        //         />
        //       )
        //     }

        //     if (category === 'Albums') {
        //       return (
        //         <SidebarItem
        //           author={item.author}
        //           key={index}
        //           type="album"
        //           name={item.title}
        //           thumbnail={item.imageUrl}
        //         />
        //       )
        //     }
        //   }
        // )
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
          <button onClick={() => handleClick(item.name)} key={index}>
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
