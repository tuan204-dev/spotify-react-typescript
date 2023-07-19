import { FC } from 'react'
import styles from './TopLayout.module.scss'
import classNames from 'classnames/bind'
import Split from 'react-split'
import { Sidebar } from '@/components'
import { MainLayoutProvider } from '@/contexts/MainLayoutContext'
import { Outlet } from 'react-router-dom'

const cx = classNames.bind(styles)

const TopLayout: FC = () => {
  return (
    <div className={cx('top-layout-wrapper')}>
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
    </div>
  )
}

export default TopLayout
