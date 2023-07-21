import { FC, useState, memo } from 'react'
import styles from './PlayButton.module.scss'
import classNames from 'classnames/bind'
import { TbPlayerPlayFilled } from 'react-icons/tb'
import { GiPauseButton } from 'react-icons/gi'

const cx = classNames.bind(styles)

interface PlayButtonProps {
  size: number
  fontSize?: number
  transitionDuration?: number //ms
  scaleHovering?: number
  bgColor?: string
  isPlay?: boolean
}

const PlayButton: FC<PlayButtonProps> = (props) => {
  const {
    size,
    fontSize,
    transitionDuration,
    scaleHovering,
    bgColor,
    isPlay = false,
  } = props
  const [isHovering, setHovering] = useState<boolean>(false)

  return (
    <div
      className={cx('wrapper')}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <button
        className={cx({
          'play-btn': true,
        })}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: `${size / 2}px`,
          fontSize: `${fontSize}px`,
          transitionDuration: `${transitionDuration}ms`,
          transform:
            isHovering && scaleHovering !== 1 ? `scale(${scaleHovering})` : undefined,
          backgroundColor: bgColor ? bgColor : undefined,
          opacity: isHovering ? 1 : undefined,
        }}
      >
        {!isPlay ? (
          <TbPlayerPlayFilled className={cx('play-btn-child')} />
        ) : (
          <GiPauseButton className={cx('play-btn-child')} />
        )}
      </button>
    </div>
  )
}

export default memo(PlayButton)
