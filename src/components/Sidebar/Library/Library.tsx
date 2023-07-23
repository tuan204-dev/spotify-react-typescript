/* eslint-disable react-hooks/exhaustive-deps */
import { LibraryIcon } from '@/assets/icons'
import { SidebarItem } from '@/components'
import { AuthContext } from '@/contexts/AuthContext'
import { LibDataItem, LibSelection } from '@/types/sidebar'
import { fetchSidebarData } from '@/utils'
import classNames from 'classnames/bind'
import { FC, useContext, useEffect, useMemo, useState } from 'react'
import { HiArrowRight, HiOutlinePlus } from 'react-icons/hi'
import styles from './Library.module.scss'

const cx = classNames.bind(styles)

type libCategory = 'playlist' | 'album' | 'artist'

const Library: FC = () => {
  const { userData, isLogged, handleLogin } = useContext(AuthContext)
  const [category, setCategory] = useState<libCategory>('playlist')
  const [bottomShadow, setBottomShadow] = useState<boolean>(false)
  const [data, setData] = useState<LibDataItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSidebarData({ type: category, userId: userData?.id })
      setData(data)
    }
    fetchData()
  }, [category, userData])

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

  const libNotify = (type: libCategory): string => {
    switch (type) {
      case 'playlist':
        return 'Log in to view your playlists.'
      case 'artist':
        return 'Login to view your favorite artists.'
      case 'album':
        return 'Login to view your albums saved.'
    }
  }

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
      {isLogged ? (
        <div onScroll={handleScroll} className={cx('playlist-section')}>
          {data?.map((item, index: number) => (
            <SidebarItem
              key={item?.id || index}
              id={item?.id || item?.album?.id}
              author={item?.owner && item?.owner?.display_name}
              artists={item?.artists || item?.album?.artists}
              type={libSelection?.type}
              name={item?.name || item?.album?.name}
              thumbnail={
                item?.images?.[item?.images?.length - 1]?.url ??
                item?.album?.images?.[item?.album?.images?.length - 1 ?? 0]?.url
              }
            />
          ))}
        </div>
      ) : (
        <div className={cx('lib-notify')}>
          <span onClick={handleLogin} className={cx('content')}>
            {libNotify(category)}
          </span>
        </div>
      )}
    </div>
  )
}

export default Library
