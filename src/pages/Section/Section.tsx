import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Section.module.scss'
import classNames from 'classnames/bind'
import { SectionItemI } from '../../../types'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { Section as SectionContent } from '@/components'

const cx = classNames.bind(styles)

interface SectionData {
  title?: string
  id?: string
  dataType?: string
  data?: SectionItemI[]
}

const Section: React.FC = () => {
  const [data, setData] = useState<SectionData>({})

  const { search } = useLocation()
  // console.log(search)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/data/${search.substring(1)}.json`)
      const data = await response.json()
      console.log(data)
      setData(data)
    }
    fetchData()
  }, [])

  return (
    <div className={cx('wrapper')}>
      <Navbar isSection />
      <div className={cx('body')}>
        <SectionContent
          isFull
          dataType={data.dataType}
          title={data.title}
          data={data.data}
        />
        <Footer />
      </div>
    </div>
  )
}

export default Section
