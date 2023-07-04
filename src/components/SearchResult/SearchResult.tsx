import { FC, useState, useEffect, useMemo } from 'react'
import styles from './SearchResult.module.scss'
import classNames from 'classnames/bind'
import TopResult from './TopResult/TopResult'
import { Footer, Section } from '..'
import { getAccessToken, searchData } from '@/utils/fetchData'
import SongList from '../SongList/SongList'

const cx = classNames.bind(styles)

interface SearchResultProps {
  query: string
}

const SearchResult: FC<SearchResultProps> = ({ query }) => {
  const [data, setData] = useState<any>()
  const [category, setCategory] = useState<string>('all')

  const searchSelection = useMemo(
    () => [
      {
        key: 'all',
        active: category === 'all',
        display: 'All',
      },
      {
        key: 'albums',
        active: category === 'albums',
        display: 'Albums',
      },
      {
        key: 'artists',
        active: category === 'artists',
        display: 'Artists',
      },
      {
        key: 'tracks',
        active: category === 'tracks',
        display: 'Songs',
      },
      {
        key: 'playlists',
        active: category === 'playlists',
        display: 'Playlists',
      },
      {
        key: 'shows',
        active: category === 'shows',
        display: 'Podcasts & Shows',
      },
      {
        key: 'episodes',
        active: category === 'episodes',
        display: 'Episodes',
      },
    ],
    [category]
  )

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken()
      const data = await searchData({
        query: query,
        accessToken: token,
        market: 'VN'
      })

      setData({ ...data })
    }
    fetchData()
  }, [query])

  if (
    data?.albums.items.filter((item: any) => item).length === 0 &&
    data?.artists.items.filter((item: any) => item).length === 0 &&
    data?.audiobooks.items.filter((item: any) => item).length === 0 &&
    data?.episodes.items.filter((item: any) => item).length === 0 &&
    data?.playlists.items.filter((item: any) => item).length === 0 &&
    data?.shows.items.filter((item: any) => item).length === 0 &&
    data?.tracks.items.filter((item: any) => item).length === 0
  ) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          justifyContent: 'space-between',
        }}
      >
        <div className={cx('not-found')}>
          <p className={cx('title')}>{`No results found for "${query}"`}</p>
          <span className={cx('msg')}>
            Please make sure your words are spelled correctly, or use fewer or different
            keywords.
          </span>
        </div>
        <Footer />
      </div>
    )
  }


  return (
    <div className={cx('wrapper')}>
      <div className={cx('search__kind')}>
        {searchSelection.map((item, index) => (
          <button
            key={index}
            className={cx({ btn: true, active: item.active })}
            onClick={() => setCategory(item.key)}
          >
            {item.display}
          </button>
        ))}
      </div>
      <div style={{ marginTop: '52px' }}>
        {category !== 'all' ? (
          searchSelection
            .filter((item) => item.active)
            .map((item, index) => {
              if (item.key !== 'tracks') {
                return (
                  <div style={{ marginTop: '-64px' }}>
                    <Section
                      key={index}
                      dataType={item.key.slice(0, -1)}
                      isFull
                      data={data[item.key].items
                        .filter((item: any) => item)
                        .sort((a: any, b: any) => -a.popularity + b.popularity)}
                    />
                  </div>
                )
              } else {
                return (
                  <SongList
                    pivotTop={116}
                    key={index}
                    songList={data.tracks.items
                      .filter((item: any) => item)
                      .sort((a: any, b: any) => -a.popularity + b.popularity)}
                  />
                )
              }
            })
        ) : (
          <>
            {data?.tracks.items?.filter((item: any) => item).length !== 0 && <TopResult
              topResult={data?.tracks?.items[0]}
              songs={data?.tracks?.items
                .filter((item: any) => item)
                .sort((a: any, b: any) => -a.popularity + b.popularity)}
            />}
            {data?.artists?.items.filter((item: any) => item).length !== 0 && (
              <Section
                isSearch
                title="Artists"
                dataType="artist"
                data={data?.artists?.items
                  .filter((item: any) => item)
                  .sort((a: any, b: any) => -a.popularity + b.popularity)}
              />
            )}
            {data?.albums?.items.filter((item: any) => item).length !== 0 && (
              <Section
                isSearch
                title="Albums"
                dataType="album"
                data={data?.albums?.items
                  .filter((item: any) => item)
                  .sort((a: any, b: any) => -a.popularity + b.popularity)}
              />
            )}
            {data?.playlists?.items.filter((item: any) => item).length !== 0 && (
              <Section
                isSearch
                title="Playlists"
                dataType="playlist"
                data={data?.playlists?.items
                  .filter((item: any) => item)
                  .sort((a: any, b: any) => -a.popularity + b.popularity)}
              />
            )}
            {data?.episodes?.items.filter((item: any) => item).length !== 0 && (
              <Section
                isSearch
                title="Episodes"
                dataType="episode"
                data={data?.episodes?.items
                  .filter((item: any) => item)
                  .sort((a: any, b: any) => -a.popularity + b.popularity)}
              />
            )}
            {data?.shows?.items.filter((item: any) => item).length !== 0 && (
              <Section
                isSearch
                title="Podcasts"
                dataType="show"
                data={data?.shows?.items
                  .filter((item: any) => item)
                  .sort((a: any, b: any) => -a.popularity + b.popularity)}
                isShow
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default SearchResult
