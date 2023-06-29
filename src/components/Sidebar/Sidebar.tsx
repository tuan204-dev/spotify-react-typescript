import { FC, ReactNode, memo } from 'react'
import Library from './Library/Library'
import Nav from './Nav/Nav'
import styles from './Sidebar.module.scss'

interface SidebarProps {
  children?: ReactNode
}

const Sidebar: FC<SidebarProps> = () => {
  return (
    <aside className={styles.sidebar}>
      <Nav />
      <Library />
    </aside>
  )
}

export default memo(Sidebar)
