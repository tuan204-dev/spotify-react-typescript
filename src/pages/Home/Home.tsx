import styles from './Home.module.scss'
import classNames from 'classnames/bind'
import Navbar from '@/components/Navbar/Navbar'
import Greeting from '@/components/Greeting/Greeting'
import { useEffect, useRef, useState } from 'react'

const cx = classNames.bind(styles)

interface HomeProps {
  children?: React.ReactNode
}

const Home: React.FC<HomeProps> = (props) => {
  const { children } = props
  const [bgColor, setBgColor] = useState<string | null>('#c0b8c1')
  const [navOpacity, setNavOpacity] = useState<number>(0)

  const handleScroll = (e: any): void => {
    const yAxis = e.currentTarget.scrollTop
    if (yAxis > 64) {
      setNavOpacity(1)
      return
    }
    setNavOpacity(yAxis / 64)
  }

  return (
    <div className={cx('home')}>
      <Navbar navOpacity={navOpacity} bgColor={bgColor} />
      <div onScroll={(e) => handleScroll(e)} className={cx('body')}>
        <Greeting bgColor={bgColor} setBgColor={setBgColor} />
        <div style={{ height: '3000px', background: '#121212' }}></div>
      </div>
    </div>
  )
}

export default Home
