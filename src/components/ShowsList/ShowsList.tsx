import { FC, memo, useState, useEffect } from 'react'
import styles from './ShowsList.module.scss'
import classNames from 'classnames/bind'
import { ShowData, ShowItem as ShowItemProps } from '@/types/show'
import { ShowItem } from '..'
import { useInView } from 'react-intersection-observer'

const cx = classNames.bind(styles)

interface ShowsListProps {
  data?: ShowItemProps[]
  originalData?: ShowData
  isLoading?: boolean
}

const ShowsList: FC<ShowsListProps> = ({ data, isLoading, originalData }) => {
  const [renderNumb, setRenderNumb] = useState<number>(() => {
    if ((data?.length ?? 0 < 9) && data?.length) {
      return data?.length
    }
    return 9
  })

  const { ref, inView } = useInView({ threshold: 0 })

  useEffect(() => {
    if (renderNumb === data?.length) {
      return
    }
    if (inView && data?.length && renderNumb + 10 > data?.length) {
      setRenderNumb(data.length)
    } else {
      setRenderNumb((prev) => prev + 10)
    }
  }, [inView])

  return (
    <div className={cx('shows-list-wrapper')}>
      <h3 className={cx('title')}>All Episodes</h3>
      <div className={cx('body')}>
        {!isLoading ? (
          <>
            {data?.slice(0, renderNumb)?.map((item) => (
              <ShowItem
                isLoading={isLoading}
                key={item?.id}
                item={item}
                show={{
                  name: originalData?.name,
                  id: originalData?.id,
                  publisher: originalData?.publisher,
                }}
              />
            ))}
            <div ref={ref} style={{ marginTop: '-60px' }}></div>
          </>
        ) : (
          Array(5)
            .fill(0)
            .map((item, index) => <ShowItem key={index + item} isLoading={true} />)
        )}
      </div>
    </div>
  )
}

export default memo(ShowsList)
