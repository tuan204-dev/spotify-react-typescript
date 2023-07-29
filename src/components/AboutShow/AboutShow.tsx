import { useEllipsisVertical } from '@/hooks'
import classNames from 'classnames/bind'
import { FC, memo, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import styles from './AboutShow.module.scss'

const cx = classNames.bind(styles)

interface AboutShowProps {
  htmlDesc?: string
  isLoading?: boolean
}

const AboutShow: FC<AboutShowProps> = ({ htmlDesc, isLoading }) => {
  const [isExpanded, setExpanded] = useState<boolean>(false)

  const descRef = useRef<any>()

  const isEllipsisActive = useEllipsisVertical(descRef.current)

  return (
    <div className={cx('about-show-wrapper')}>
      <h3 className={cx('title')}>
        {!isLoading ? 'About' : <Skeleton width={100} borderRadius={500} />}
      </h3>
      <div ref={descRef} className={cx({ content: true, expanded: !isExpanded })}>
        <div dangerouslySetInnerHTML={{ __html: htmlDesc ? htmlDesc : '' }}></div>
      </div>
      {isEllipsisActive && (
        <div className={cx('expand-btn')}>
          <button onClick={() => setExpanded((prev) => !prev)}>
            {isExpanded ? 'Show less' : '... Show more'}
          </button>
        </div>
      )}
    </div>
  )
}

export default memo(AboutShow)
