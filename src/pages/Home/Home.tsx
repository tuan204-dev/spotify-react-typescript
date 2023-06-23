import Greeting from '@/components/Greeting/Greeting'
import Navbar from '@/components/Navbar/Navbar'
import classNames from 'classnames/bind'
import { useState, useRef, useContext } from 'react'
import styles from './Home.module.scss'
import useComponentSize from '@/hooks/useComponentSize'
import { MainSizeContext } from '@/contexts/MainSizeContext'

const cx = classNames.bind(styles)


const Home = () => {
  const [bgColor, setBgColor] = useState<string>('#c0b8c1')
  const [navOpacity, setNavOpacity] = useState<number>(0)

  const {width} = useContext(MainSizeContext)

  console.log(width)

  // const homeRef = useRef<HTMLDivElement>(null);

  // const {width} = useComponentSize(homeRef)

  

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    const yAxis = e.currentTarget.scrollTop
    // console.log(yAxis)
    if (yAxis > 64) {
      setNavOpacity(1)
      return
    }
    setNavOpacity(yAxis / 64)
  }

  return (
    <div ref={homeRef} className={cx('home')}>
      <Navbar navOpacity={navOpacity} bgColor={bgColor} />
      <div onScroll={(e) => handleScroll(e)} className={cx('body')}>
        <Greeting widthParent={width} bgColor={bgColor} setBgColor={setBgColor} />
        <div style={{ height: '3000px', background: '#121212' }}></div>
      </div>
    </div>
  )
}

export default Home
