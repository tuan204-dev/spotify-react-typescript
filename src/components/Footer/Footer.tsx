import { bottomLinks, socialNetworkLinks, topLinkGroups } from '@/constants'
import classNames from 'classnames/bind'
import { FC, memo } from 'react'
import styles from './Footer.module.scss'
import LinkGroup from './LinkGroup/LinkGroup'

const cx = classNames.bind(styles)

const Footer: FC = () => {
  return (
    <footer className={cx('footer')}>
      <nav className={cx('footer__top')}>
        <div className={cx('footer__top-links')}>
          {topLinkGroups.map((links) => (
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
          {bottomLinks.map((item, index) => (
            <a key={index} target='_blank' className={cx('footer__bottom-links-item')} href={item.href}>
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

export default memo(Footer)
