import React from 'react'
import styles from './SectionItem.module.scss'
import classNames from 'classnames/bind'
import { SectionItemI } from '../../../types'
import { TbPlayerPlayFilled } from 'react-icons/tb'

const cx = classNames.bind(styles)

const SectionItem: React.FC<SectionItemI> = ({
  title,
  name,
  imageUrl,

}) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('img')}>
        <img src={imageUrl} alt={title || name} />
        <button
          className={cx({
            'play-btn': true,
          })}
        >
          <TbPlayerPlayFilled className={cx('play-btn-child')} />
        </button>
      </div>
      <div className={cx('body')}>
        <h3 className={cx('heading')}>{title || name}</h3>
        <p className={cx('desc')}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </div>
  )
}

export default SectionItem
