import { FC } from 'react'
import styles from './RootLayout.module.scss'
import classNames from 'classnames/bind'
import { Outlet } from 'react-router-dom'
import { SkeletonTheme } from 'react-loading-skeleton'
import Split from 'react-split'
import { Sidebar } from '@/components'
import { MainLayoutProvider } from '@/contexts/MainLayoutContext'
import { ArtistProvider } from '@/contexts/ArtistContext'

const cx = classNames.bind(styles)

const RootLayout: FC = () => {
  return (
    <main className={cx('root-layout')}>
      <ArtistProvider>
        <SkeletonTheme baseColor="#333" highlightColor="hsla(0,0%,100%,.1)">
          <Split
            cursor="col-resize"
            minSize={[280, 600]}
            // maxSize={[600, 99999]}
            sizes={[20, 80]}
            className={styles.split}
          >
            <Sidebar />
            <MainLayoutProvider>
              <div className={cx('main')}>
                <Outlet />
              </div>
            </MainLayoutProvider>
          </Split>
        </SkeletonTheme>
      </ArtistProvider>
    </main>
  )
}

export default RootLayout
