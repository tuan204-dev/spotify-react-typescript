import classNames from 'classnames/bind'
import { FC, useMemo, useState } from 'react'
import { Section } from '..'
import styles from './Discography.module.scss'

const cx = classNames.bind(styles)

interface DiscographyProps {
  data: any
}

const Discography: FC<DiscographyProps> = ({ data }) => {
  const [category, setCategory] = useState<string>('popularReleases')

  const selection = useMemo(
    () => [
      {
        key: 'popularReleases',
        display: 'Popular releases',
        active: 'popularReleases' === category,
        isExist: Boolean(data?.popularReleases?.length),
      },

      {
        key: 'albums',
        display: 'Albums',
        active: 'albums' === category,
        isExist: Boolean(data?.albums?.length),
      },
      {
        key: 'singles',
        display: 'Singles',
        active: 'singles' === category,
        isExist: Boolean(data?.singles?.length),
      },
    ],
    [category, data]
  )

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <h2>Discography</h2>
      </div>
      <div className={cx('selection')}>
        {selection
          .filter((item) => item.isExist)
          .map((item) => (
            <button
              name="category"
              key={item.key}
              className={cx({ btn: true, active: item.active })}
              onClick={() => setCategory(item.key)}
            >
              {item.display}
            </button>
          ))}
      </div>
      <div className={cx('section')}>
        <Section
          apiType="rapid"
          dataType="album"
          data={
            (category === 'popularReleases' && data?.popularReleases) ||
            (category === 'albums' && data?.albums) ||
            (category === 'singles' && data?.singles)
          }
          type="artist"
          hideHeader
        />
      </div>
    </div>
  )
}

export default Discography
