import React from 'react'
import styles from './Footer.module.scss'
import classNames from 'classnames/bind'
import { footerLinks, socialNetworkLinks, siteInfo } from '@/constants'
import LinkGroup from './LinkGroup/LinkGroup'

const cx = classNames.bind(styles)

const Footer: React.FC = () => {
  return (
    <footer className={cx('footer')}>
      <nav className={cx('footer__top')}>
        <div className={cx('footer__top-links')}>
          {footerLinks.map((links) => (
            <LinkGroup key={links.title} groupLink={links} />
          ))}
        </div>
        <div className={cx('footer__top-social-links')}>
          {socialNetworkLinks.map((item) => {
            const Icon = item.icon
            return (
              <a key={item.title} href={item.link} target="_blank">
                <Icon className={cx('icon')} />
              </a>
            )
          })}
        </div>
      </nav>
      <nav className={cx('footer__bottom')}>
        <div className={cx('footer__bottom-links')}>
          {siteInfo.map((item) => (
            <a className={cx('footer__bottom-links-item')} href={item.url}>
              {item.title}
            </a>
          ))}
        </div>
        <div className={cx('footer__bottom-copyright')}>
          <p>© 2023 Spotify AB</p>
        </div>
      </nav>
    </footer>
  )
}

export default Footer
