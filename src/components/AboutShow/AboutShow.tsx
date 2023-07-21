import { FC, useState } from 'react'
import styles from './AboutShow.module.scss'
import classNames from 'classnames/bind'
import Skeleton from 'react-loading-skeleton'

const cx = classNames.bind(styles)

interface AboutShowProps {
  htmlDesc?: string
  isLoading?: boolean
}

const AboutShow: FC<AboutShowProps> = ({ htmlDesc, isLoading }) => {
  const [isExpanded, setExpanded] = useState<boolean>(false)

  return (
    <div className={cx('about-show-wrapper')}>
      <h3 className={cx('title')}>
        {!isLoading ? 'About' : <Skeleton width={100} borderRadius={500} />}
      </h3>
      <div className={cx({ content: true, expanded: !isExpanded })}>
        <div dangerouslySetInnerHTML={{ __html: htmlDesc ? htmlDesc : '' }}></div>
      </div>
      <div className={cx('expand-btn')}>
        <button onClick={() => setExpanded((prev) => !prev)}>
          {isExpanded ? 'Show less' : '... Show more'}
        </button>
      </div>
    </div>
  )
}

export default AboutShow
