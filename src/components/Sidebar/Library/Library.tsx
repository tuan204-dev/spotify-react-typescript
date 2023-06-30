import classNames from 'classnames/bind'
import { HiArrowRight, HiOutlinePlus } from 'react-icons/hi'
import styles from './Library.module.scss'
import { useEffect, useState, useMemo, FC } from 'react'
import { LibraryIcon } from '@/assets/icons'
import { SidebarItem } from '@/components'
import { LibSelection, ResponseLibItem } from '../../../../types'

const cx = classNames.bind(styles)

const Library: FC = () => {
  const [category, setCategory] = useState<'playlist' | 'album' | 'artist'>('playlist')
  const [data, setData] = useState<ResponseLibItem[]>()
  const [bottomShadow, setBottomShadow] = useState<boolean>(false)

  const libSelections: LibSelection[] = useMemo(
    () => [
      {
        type: 'playlist',
        title: 'Playlists',
        id: '00003',
        active: category === 'playlist',
      },
      {
        type: 'artist',
        title: 'Artists',
        id: '00004',
        active: category === 'artist',
      },
      {
        type: 'album',
        title: 'Albums',
        id: '00005',
        active: category === 'album',
      },
    ],
    [category]
  )
  // console.log(data)

  const libSelection = useMemo(
    () => libSelections.find((libSelection) => libSelection.active),
    [category]
  )

  const handleClick = (type: 'playlist' | 'album' | 'artist'): void => {
    setCategory(type)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    const yAxis = e.currentTarget.scrollTop

    // console.log(yAxis)
    if (yAxis > 0) {
      setBottomShadow(true)
    } else {
      setBottomShadow(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`data/${libSelection!.id}.json`)
      const data = await response.json()
      setData(data.data)
    }

    fetchData()
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

      <div className={cx({ selection: true, 'bottom-shadow': bottomShadow })}>
        {libSelections.map((item, index) => (
          <button onClick={() => handleClick(item.type)} key={index}>
            {item.title}
          </button>
        ))}
      </div>
      <div onScroll={(e) => handleScroll(e)} className={cx('playlist-section')}>
        {data?.map((item: any, index: number) => (
          <SidebarItem
            key={index}
            id={item.id}
            author={item?.owner && item?.owner.display_name}
            artists={item?.artists && item?.artists}
            type={libSelection?.type}
            name={item.name}
            thumbnail={item.images[item.images.length - 1].url}
          />
        ))}
      </div>
    </div>
  )
}

export default Library
