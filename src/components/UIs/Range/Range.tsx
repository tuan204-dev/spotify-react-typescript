import classNames from 'classnames/bind'
import React, { FC } from 'react'
import styles from './Range.module.scss'

const cx = classNames.bind(styles)

interface RangeProps {
  maxValue?: number
  step?: number
  process?: number
  setProcess?: React.Dispatch<React.SetStateAction<number>>
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleMouseUp: (e?: React.MouseEvent<HTMLInputElement>) => void
}

const Range: FC<RangeProps> = ({
  maxValue,
  step,
  process,
  handleChange,
  handleMouseUp,
}) => {
  console.log(process)

  return (
    <div className={cx('wrapper')}>
      <div style={{ overflow: 'hidden', height: '100%', borderRadius: '2px' }}>
        <div
          style={{
            transform: `translateX(calc(-100% + 100% * ${
              maxValue && process ? process / maxValue : 0
            }))`,
          }}
          className={cx('process-bar')}
        ></div>
      </div>
      <input
        className={cx('controls')}
        type="range"
        min={0}
        max={maxValue}
        step={step}
        value={process}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
      />
    </div>
  )
}

export default Range
