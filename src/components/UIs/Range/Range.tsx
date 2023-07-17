import { FC, useState } from 'react'
import styles from './Range.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface RangeProps {
  duration?: number
  process?: number
  handleRangeOnChange: (e: any) => void
  handleRangeOnMouseUp: (e: any) => void
}

const Range: FC<RangeProps> = ({
  duration,
  handleRangeOnChange,
  handleRangeOnMouseUp,
  process,
}) => {

  console.log(process)

  return (
    <div className={cx('wrapper')}>
      <div style={{ overflow: 'hidden', height: '100%', borderRadius: '2px' }}>
        <div
          style={{
            transform: `translateX(calc(-100% + 100% * ${
              duration && process ? process / duration : 0
            }))`,
          }}
          className={cx('process-bar')}
        ></div>
      </div>
      <input
        min={0}
        max={duration}
        step={1}
        className={cx('controls')}
        type="range"
        value={process}
        onChange={handleRangeOnChange}
        onMouseUp={handleRangeOnMouseUp}
      />
    </div>
  )
}

export default Range
