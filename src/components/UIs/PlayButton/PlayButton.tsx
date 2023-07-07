import { FC, useState } from 'react'
import styles from './PlayButton.module.scss'
import classNames from 'classnames/bind'
import { TbPlayerPlayFilled } from 'react-icons/tb'

const cx = classNames.bind(styles)

interface PlayButtonProps {
  size: number
  fontSize?: number
  transitionDuration?: number //ms
  scaleHovering?: number
}

const PlayButton: FC<PlayButtonProps> = (props) => {
  const { size, fontSize, transitionDuration, scaleHovering } = props
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
          transform: isHovering ? `scale(${scaleHovering})` : undefined
        }}
      >
        <TbPlayerPlayFilled className={cx('play-btn-child')} />
      </button>
    </div>
  )
}

export default PlayButton
