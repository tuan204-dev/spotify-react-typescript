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
  const [isLoading, setLoading] = useState<boolean>(true)
  const [navOpacity, setNavOpacity] = useState<number>(0)
  const [isShowNavTitle, setShowNavTitle] = useState<boolean>(false)

  const bgColor = 'rgb(18, 18, 18)'
  const { ref: pivotTrackingRef, inView: isTracking } = useInView({
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
    const fetchData = async () => {
      const data = await getCategoryPlaylist({ id })
      const dataNormalized = data?.playlists?.items?.filter((item: any) => item)
      setData([...dataNormalized])
    }
    fetchData()
  }, [id])

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
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Genre
