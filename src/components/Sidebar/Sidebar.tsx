import { FC, ReactNode } from 'react'
import Library from './Library/Library'
import Nav from './Nav/Nav'
import styles from './Sidebar.module.scss'

interface SidebarProps {
  children?: ReactNode
}

const Sidebar: FC<SidebarProps> = () => {
  return (
    <div className={styles.sidebar}>
      <Nav />
      <Library />
    </div>
  )
}

export default Sidebar
