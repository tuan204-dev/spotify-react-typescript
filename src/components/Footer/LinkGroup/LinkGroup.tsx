import React from 'react'
import styles from './LinkGroup.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface LinkGroupProps {
  groupLink: {
    title: string
    links: {
      title: string
      href: string
      dataAttributes: { 'data-ga-category': string; 'data-ga-action': string }
    }[]
  }
}

const LinkGroup: React.FC<LinkGroupProps> = ({ groupLink }) => {
  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('title')}>{groupLink.title}</h3>
      <div className={cx('list')}>
        {groupLink.links.map((item, index) => (
          <a target='_blank' key={index} href={item.href}>
            {item.title}
          </a>
        ))}
      </div>
    </div>
  )
}

export default LinkGroup
