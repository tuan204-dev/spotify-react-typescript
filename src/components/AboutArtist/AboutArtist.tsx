import {FC} from 'react'
import styles from './AboutArtist.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const AboutArtist: FC = () => {
  return (
    <div className={cx('wrapper')}>AboutArtist</div>
  )
}

export default AboutArtist