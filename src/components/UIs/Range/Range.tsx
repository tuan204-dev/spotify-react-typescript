import { FC, useState, useRef } from 'react'
import styles from './Range.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface RangeProps {
  maxValue: number
  type?: 'trackProcess' | 'volume'
  setTrackProcess: React.Dispatch<React.SetStateAction<number>>
}

const Range: FC<RangeProps> = ({ maxValue, type = 'trackProcess', setTrackProcess }) => {
  const [process, setProcess] = useState<number>(0)

  const intervalId = useRef<any>()

  const startTimer = () => {
    clearInterval(intervalId.current)
    intervalId.current = setInterval(() => {
      setProcess((prev) => prev + 1)
    }, 1000)
  }

  const handleChange = (e: any) => {
    if (type === 'trackProcess') {
      clearInterval(intervalId.current)
      setProcess(e.target.value)
    }

    return
  }

  const handleMouseUp = (e: any) => {
    if (type === 'trackProcess') {
      startTimer()
      setTrackProcess(e.target.value)
    }
  }

  return (
    <div className={cx('wrapper')}>
      <div style={{ overflow: 'hidden', height: '100%', borderRadius: '2px' }}>
        <div
          style={{
            transform: `translateX(calc(-100% + 100% * ${
              maxValue ? process / maxValue : 0
            }))`,
          }}
          className={cx('process-bar')}
        ></div>
      </div>
      <input
        min={0}
        max={maxValue}
        step={1}
        className={cx('controls')}
        type="range"
        value={process}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
      />
    </div>
  )
}

export default Range
