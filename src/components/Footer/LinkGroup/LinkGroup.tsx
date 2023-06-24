import React from 'react'
import styles from './LinkGroup.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface LinkGroupProps {
  groupLink: { title: string; link: { title: string; url: string }[] }
}

const LinkGroup: React.FC<LinkGroupProps> = ({ groupLink }) => {
  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('title')}>{groupLink.title}</h3>
      <div className={cx('list')}>
        {groupLink.link.map((item, index) => (
          <a key={index} href={item.url}>
            {item.title}
          </a>
        ))}
      </div>
    </div>
  )
}

export default LinkGroup
