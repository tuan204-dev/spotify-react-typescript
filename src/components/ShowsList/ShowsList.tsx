import { FC, memo } from 'react'
import styles from './ShowsList.module.scss'
import classNames from 'classnames/bind'
import { ShowData, ShowItem as ShowItemProps } from '@/types/show'
import { ShowItem } from '..'

const cx = classNames.bind(styles)

interface ShowsListProps {
  data?: ShowItemProps[]
  originalData?: ShowData
  isLoading?: boolean
}

const ShowsList: FC<ShowsListProps> = ({ data, isLoading, originalData }) => {
  return (
    <div className={cx('shows-list-wrapper')}>
      <h3 className={cx('title')}>All Episodes</h3>
      <div className={cx('body')}>
        {!isLoading
          ? data?.map((item, index) => (
              <ShowItem
                isLoading={isLoading}
                key={index}
                item={item}
                show={{
                  name: originalData?.name,
                  id: originalData?.id,
                  publisher: originalData?.publisher,
                }}
              />
            ))
          : Array(5)
              .fill(0)
              .map((item, index) => <ShowItem key={index + item} isLoading={true} />)}
      </div>
    </div>
  )
}

export default memo(ShowsList)
