import { LibraryIcon } from '@/assets/icons'
import { SidebarItem } from '@/components'
import { AuthContext } from '@/contexts/AuthContext'
import { fetchSidebarData } from '@/utils'
import classNames from 'classnames/bind'
import { FC, useContext, useEffect, useMemo, useState } from 'react'
import { HiArrowRight, HiOutlinePlus } from 'react-icons/hi'
import { LibSelection } from '../../../../types'
import styles from './Library.module.scss'

const cx = classNames.bind(styles)

const Library: FC = () => {
  const { userData } = useContext(AuthContext)
  const [category, setCategory] = useState<'playlist' | 'album' | 'artist'>('playlist')
  const [bottomShadow, setBottomShadow] = useState<boolean>(false)
  const [data, setData] = useState<any>()

  // console.log(userData)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSidebarData({ type: category, userId: userData?.id })
      setData(data)
    }
    fetchData()
  }, [category, userData])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getUserAlbum()
  //     console.log(data)
  //   }
  //   fetchData()
  // }, [])

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

  const libSelection = useMemo(
    () => libSelections.find((libSelection) => libSelection.active),
    [category]
  )

  const handleClick = (type: 'playlist' | 'album' | 'artist'): void => {
    setCategory(type)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    const yAxis = e.currentTarget.scrollTop

    if (yAxis > 0) {
      setBottomShadow(true)
    } else {
      setBottomShadow(false)
    }
  }

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
      <div onScroll={handleScroll} className={cx('playlist-section')}>
        {data?.map((item: any, index: number) => (
          <SidebarItem
            key={item?.id || index}
            id={item?.id || item?.album?.id}
            author={item?.owner && item?.owner?.display_name}
            artists={item?.artists || item?.album?.artists}
            type={libSelection?.type}
            name={item?.name || item?.album?.name}
            thumbnail={
              item?.images?.[item?.images?.length - 1]?.url ||
              item?.album?.images[item?.album?.images.length - 1]?.url
            }
          />
        ))}
      </div>
    </div>
  )
}

export default Library
