import { FC, useState, memo } from 'react'
import styles from './PlayButton.module.scss'
import classNames from 'classnames/bind'
import { TbPlayerPlayFilled } from 'react-icons/tb'

const cx = classNames.bind(styles)

interface PlayButtonProps {
  size: number
  fontSize?: number
  transitionDuration?: number //ms
  scaleHovering?: number
  bgColor?: string
}

const PlayButton: FC<PlayButtonProps> = (props) => {
  const { size, fontSize, transitionDuration, scaleHovering, bgColor } = props
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
          // scale: isHovering ? scaleHovering : undefined,
          transform: isHovering ? `scale(${scaleHovering})` : undefined,
          backgroundColor: bgColor ? bgColor : undefined,
        }}
      >
        <TbPlayerPlayFilled className={cx('play-btn-child')} />
      </button>
    </div>
  )
}

export default memo(PlayButton)
