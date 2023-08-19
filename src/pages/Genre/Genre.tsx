import { FC, useEffect, useRef, useState } from 'react'
import styles from './Genre.module.scss'
import classNames from 'classnames/bind'
import { Footer, Header, Navbar, Section } from '@/components'
import { useParams } from 'react-router-dom'
import { getCategoryInfo, getCategoryPlaylist } from '@/apis/categoriesApi'
import { PlaylistData } from '@/types/playlist'
import { CategoryItem } from '@/types/search'
import { ResponseSectionItem } from '@/types/section'
import { useComponentSize } from '@/hooks'
import { useInView } from 'react-intersection-observer'

const cx = classNames.bind(styles)

const Genre: FC = () => {
  const [info, setInfo] = useState<CategoryItem>()
  const [data, setData] = useState<PlaylistData[]>([])
  const [renderNumb, setRenderNumb] = useState<number>(19)
  const [totalPlaylist, setTotalPlaylist] = useState<number>(0)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [navOpacity, setNavOpacity] = useState<number>(0)
  const [isShowNavTitle, setShowNavTitle] = useState<boolean>(false)

  const bgColor = 'rgb(18, 18, 18)'
  const { ref: pivotTrackingRef, inView: isTracking } = useInView({
    threshold: 0,
  })

  const { ref: lazyLoadingRef, inView: lazyLoadingInView } = useInView({
    threshold: 0,
  })

  const { id } = useParams()

  const headerRef = useRef<any>()
  const { height: headerHeight } = useComponentSize(headerRef)

  useEffect(() => {
    const fetchInfo = async () => {
      const data = await getCategoryInfo({ id })
      setInfo({ ...data })
    }

    fetchInfo()
  }, [id])

  useEffect(() => {
    const fetchInitData = async () => {
      const data = await getCategoryPlaylist({ id, limit: renderNumb, offset: 0 })
      setTotalPlaylist(data?.playlists?.total ?? 0)
      const dataNormalized = data?.playlists?.items?.filter((item: any) => item)
      setData([...dataNormalized])
    }
    fetchInitData()
  }, [id])

  useEffect(() => {
    if (!lazyLoadingInView || totalPlaylist === 0) {
      return
    }

    if (totalPlaylist > renderNumb) {
      const fetchData = async () => {
        const data = await getCategoryPlaylist({ id, limit: 18, offset: renderNumb })
        const dataNormalized = data?.playlists?.items?.filter((item: any) => item)
        setData((prev) => [...prev, ...dataNormalized])
        if (renderNumb + 18 > totalPlaylist) {
          setRenderNumb(totalPlaylist)
        } else {
          setRenderNumb(renderNumb + 18)
        }
      }
      fetchData()
    }
  }, [lazyLoadingInView])

  useEffect(() => {
    if (info && data?.length !== 0) {
      setLoading(false)
    } else setLoading(true)
  }, [data, info])

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    const yAxis = e.currentTarget.scrollTop
    if (yAxis < headerHeight) {
      setNavOpacity(yAxis / headerHeight)
    } else setNavOpacity(1)

    if (yAxis > headerHeight + 70) {
      setShowNavTitle(true)
    } else {
      setShowNavTitle(false)
    }
  }

  return (
    <div className={cx('genre-wrapper')}>
      <Navbar
        bgColor={bgColor}
        navOpacity={navOpacity}
        type="genre"
        title={info?.name}
        showTitle={isShowNavTitle}
      />
      <div onScroll={(e) => isTracking && handleScroll(e)} className={cx('body')}>
        <div
          ref={pivotTrackingRef}
          className={cx('pivot-tracking')}
          style={{ top: `${headerHeight + 74}px` }}
        ></div>
        <div ref={headerRef}>
          <Header
            headerType="genre"
            bgColor={bgColor}
            title={info?.name}
            isLoading={isLoading}
          />
        </div>
        <div className={cx('main')}>
          <div style={{ backgroundColor: `${bgColor}` }} className={cx('bg-blur')}></div>
          <div className={cx('section')}>
            <Section
              apiType="spotify"
              dataType="playlist"
              data={data as ResponseSectionItem[]}
              isFull={true}
              isClickable={false}
              hideHeader={true}
              pageType="genre"
            />
          </div>
          <div ref={lazyLoadingRef}></div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Genre
