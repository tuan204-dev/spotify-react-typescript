import { FC, useContext } from 'react'
import styles from './RootLayout.module.scss'
import classNames from 'classnames/bind'
import { Outlet } from 'react-router-dom'
import { SkeletonTheme } from 'react-loading-skeleton'
import Split from 'react-split'
import { PlayingView, Sidebar } from '@/components'
import { MainLayoutProvider } from '@/contexts/MainLayoutContext'
import { ArtistProvider } from '@/contexts/ArtistContext'
import { SearchProvider } from '@/contexts/SearchContext'
import { HomePageProvider } from '@/contexts/HomePageContext'
import { AudioPlayer } from '@/components'
import { PlayerProvider } from '@/contexts/PlayerContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { AppContext } from '@/App'

const cx = classNames.bind(styles)

const RootLayout: FC = () => {
  const { isPlayingViewShowed } = useContext(AppContext)

  return (
    <main className={cx('root-layout')}>
      <AuthProvider>
        <PlayerProvider>
          <HomePageProvider>
            <SearchProvider>
              <ArtistProvider>
                <SkeletonTheme baseColor="#333" highlightColor="hsla(0,0%,100%,.1)">
                  <div className={cx('top')}>
                    <Split
                      cursor="col-resize"
                      minSize={isPlayingViewShowed ? [280, 400, 0] : [280, 600]}
                      maxSize={isPlayingViewShowed ? [500, 99999, 400] : [500, 99999]}
                      // sizes={[20, 70, 10]}
                      sizes={isPlayingViewShowed ? [20, 60, 20] : [20, 80]}
                      className={styles.split}
                      gutterSize={8}
                      snapOffset={20}
                    >
                      <Sidebar />
                      <MainLayoutProvider>
                        <div className={cx('main')}>
                          <Outlet />
                        </div>
                      </MainLayoutProvider>
                      {isPlayingViewShowed ? (
                        <PlayingView />
                      ) : (
                        <div style={{ marginRight: '-8px' }}></div>
                      )}
                    </Split>
                  </div>
                  <div className={cx('bottom')}>
                    <AudioPlayer />
                  </div>
                </SkeletonTheme>
              </ArtistProvider>
            </SearchProvider>
          </HomePageProvider>
        </PlayerProvider>
      </AuthProvider>
    </main>
  )
}

export default RootLayout
