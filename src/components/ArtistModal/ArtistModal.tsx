import classNames from 'classnames/bind'
import { FC } from 'react'
import Modal from 'react-modal'
import 'react-multi-carousel/lib/styles.css'
import styles from './ArtistModal.module.scss'

const cx = classNames.bind(styles)

interface ArtistModalProps {
  visualImgs?: any
  desc?: string
  stats?: any
}

const ArtistModal: FC<ArtistModalProps> = () => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 999,
    },
  }

  return (
    <div className={cx('wrapper')}>
      <Modal isOpen={true} style={customStyles}></Modal>
    </div>
  )
}

export default ArtistModal
