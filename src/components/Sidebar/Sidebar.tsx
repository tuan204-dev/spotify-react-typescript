import React, { FC, ReactNode } from 'react'
import Nav from './Nav/Nav'
import Library from './Library/Library'
import styles from './Sidebar.module.scss'


interface SidebarProps {
  children?: ReactNode
}

const Sidebar: FC<SidebarProps> = (props) => {
  return (
    <div className={styles.sidebar}>
      <Nav />
      <Library />
    </div>
  )
}

export default Sidebar
