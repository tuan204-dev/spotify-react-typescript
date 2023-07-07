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
      },

      {
        key: 'albums',
        display: 'Albums',
        active: 'albums' === category,
      },
      {
        key: 'singles',
        display: 'Singles',
        active: 'singles' === category,
      },
    ],
    [category]
  )
  
  console.log(data)

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <h2>Discography</h2>
      </div>
      <div className={cx('selection')}>
        {selection.map((item, index) => (
          <button
            key={index}
            className={cx({ btn: true, active: item.active })}
            onClick={() => setCategory(item.key)}
          >
            {item.display}
          </button>
        ))}
      </div>
      <div className={cx('section')}>
        <Section
          dataType="album"
          data={
            (category === 'popularReleases' && data?.popularReleases.items) ||
            (category === 'albums' && data?.albums.items) ||
            (category === 'singles' && data?.singles.items)
          }
          type='artist'
          hideHeader
        />
      </div>
    </div>
  )
}

export default Discography
