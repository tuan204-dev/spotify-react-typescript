import { FC, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Skeleton from 'react-loading-skeleton'
import styles from './Image.module.scss'

interface ImageLazyProps {
  src?: string
  alt?: string
}

const ImageLazy: FC<ImageLazyProps> = (props) => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [mounted, setMounted] = useState<boolean>(false)
  const { src = '', alt = '' } = props

  const { ref, inView } = useInView({ threshold: 0, triggerOnce: true })

  useEffect(() => {
    if (inView && !mounted) {
      setMounted(true)
    }
  }, [inView])

  useEffect(() => {
    if (mounted) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setLoading(false)
      }
    }
  }, [src, mounted])

  return (
    <div ref={ref} className={styles.wrapper}>
      <div style={{ display: !isLoading ? 'none' : '' }}>
        <Skeleton height={500} width="100%" />
      </div>
      <img
        src={mounted ? src : ''}
        alt={alt}
        style={{ display: isLoading ? 'none' : '' }}
      />
    </div>
  )
}

export default ImageLazy
