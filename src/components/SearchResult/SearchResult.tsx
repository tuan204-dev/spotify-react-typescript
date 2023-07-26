/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchContext } from '@/contexts/SearchContext'
import classNames from 'classnames/bind'
import { FC, useContext, useEffect, useState } from 'react'
import { Section } from '..'
import SongList from '../SongList/SongList'
import SearchNotFound from './SearchNotFound/SearchNotFound'
import styles from './SearchResult.module.scss'
import TopResult from './TopResult/TopResult'

const cx = classNames.bind(styles)

const SearchResult: FC = () => {
  const { data, query, categoryRef } = useContext(SearchContext)
  const [category, setCategory] = useState<string>(categoryRef.current)
  const [searchSelections, setSearchSelections] = useState<any>([])

  useEffect(() => {
    setSearchSelections([
      {
        key: 'all',
        active: category === 'all',
        display: 'All',
        isExist: true,
      },
      {
        key: 'albums',
        active: category === 'albums',
        display: 'Albums',
        isExist: Boolean(data?.albums?.total),
      },
      {
        key: 'artists',
        active: category === 'artists',
        display: 'Artists',
        isExist: Boolean(data?.artists?.total),
      },
      {
        key: 'tracks',
        active: category === 'tracks',
        display: 'Songs',
        isExist: Boolean(data?.tracks?.total),
      },
      {
        key: 'playlists',
        active: category === 'playlists',
        display: 'Playlists',
        isExist: Boolean(data?.playlists?.total),
      },
      {
        key: 'shows',
        active: category === 'shows',
        display: 'Podcasts & Shows',
        isExist: Boolean(data?.shows?.total),
      },
      {
        key: 'episodes',
        active: category === 'episodes',
        display: 'Episodes',
        isExist: Boolean(data?.episodes?.total),
      },
    ])
  }, [category, data])

  if (
    data?.albums.items.filter((item: any) => item).length === 0 &&
    data?.artists.items.filter((item: any) => item).length === 0 &&
    data?.episodes.items.filter((item: any) => item).length === 0 &&
    data?.playlists.items.filter((item: any) => item).length === 0 &&
    data?.shows.items.filter((item: any) => item).length === 0 &&
    data?.tracks.items.filter((item: any) => item).length === 0
  ) {
    return <SearchNotFound query={query} />
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('search__kind')}>
        {searchSelections
          .filter((item: any) => item.isExist)
          .map((item: any) => (
            <button
              name="search category"
              key={item.key}
              className={cx({ btn: true, active: item.active })}
              onClick={() => {
                categoryRef.current = item.key
                setCategory(item.key)
              }}
            >
              {item.display}
            </button>
          ))}
      </div>
      <div>
        {category !== 'all' ? (
          searchSelections
            .filter((item: any) => item.active)
            .map((item: any, index: number) => {
              if (item.key !== 'tracks') {
                return (
                  <div style={{ marginTop: '-64px' }} key={index}>
                    <Section
                      apiType="spotify"
                      key={item.key}
                      dataType={item.key.slice(0, -1)}
                      isFull
                      data={data?.[item?.key]?.items
                        ?.filter((item: any) => item)
                        ?.sort((a: any, b: any) => -a.popularity + b.popularity)}
                    />
                  </div>
                )
              } else {
                return (
                  <SongList
                    top={52}
                    pivotTop={126}
                    key={item?.key}
                    songList={data?.tracks?.items
                      ?.filter((item: any) => item)
                      ?.sort((a: any, b: any) => -a?.popularity + b?.popularity)}
                  />
                )
              }
            })
        ) : (
          <>
            {data?.tracks.items?.filter((item: any) => item).length !== 0 && (
              <TopResult
                topResult={data?.tracks?.items[0]}
                songs={data?.tracks?.items
                  .filter((item: any) => item)
                  .sort((a: any, b: any) => -a.popularity + b.popularity)}
              />
            )}
            {data?.artists?.items.filter((item: any) => item).length !== 0 && (
              <Section
                apiType="spotify"
                isClickable={false}
                title="Artists"
                dataType="artist"
                data={data?.artists?.items.filter((item: any) => item)}
              />
            )}
            {data?.albums?.items.filter((item: any) => item).length !== 0 && (
              <Section
                apiType="spotify"
                isClickable={false}
                title="Albums"
                dataType="album"
                data={data?.albums?.items
                  .filter((item: any) => item)
                  .sort((a: any, b: any) => -a.popularity + b.popularity)}
              />
            )}
            {data?.playlists?.items.filter((item: any) => item).length !== 0 && (
              <Section
                apiType="spotify"
                isClickable={false}
                title="Playlists"
                dataType="playlist"
                data={data?.playlists?.items
                  .filter((item: any) => item)
                  .sort((a: any, b: any) => -a.popularity + b.popularity)}
              />
            )}
            {data?.episodes?.items.filter((item: any) => item).length !== 0 && (
              <Section
                apiType="spotify"
                isClickable={false}
                title="Episodes"
                dataType="episode"
                data={data?.episodes?.items
                  .filter((item: any) => item)
                  .sort((a: any, b: any) => -a.popularity + b.popularity)}
              />
            )}
            {data?.shows?.items.filter((item: any) => item).length !== 0 && (
              <Section
                apiType="spotify"
                isClickable={false}
                title="Podcasts"
                dataType="show"
                data={data?.shows?.items
                  .filter((item: any) => item)
                  .sort((a: any, b: any) => -a.popularity + b.popularity)}
                type="show"
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default SearchResult
