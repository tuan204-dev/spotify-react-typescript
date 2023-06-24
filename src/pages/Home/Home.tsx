import Greeting from '@/components/Greeting/Greeting'
import Navbar from '@/components/Navbar/Navbar'
import classNames from 'classnames/bind'
import { useState } from 'react'
import styles from './Home.module.scss'
import Footer from '@/components/Footer/Footer'

const cx = classNames.bind(styles)

const Home = () => {
  const [bgColor, setBgColor] = useState<string>('#c0b8c1')
  const [navOpacity, setNavOpacity] = useState<number>(0)

  const handleScroll = (
    e: React.UIEvent<HTMLDivElement, UIEvent>
  ): void => {
    const yAxis = e.currentTarget.scrollTop
    // console.log(yAxis)
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
        <Footer/>
      </div>
    </div>
  )
}

export default Home
