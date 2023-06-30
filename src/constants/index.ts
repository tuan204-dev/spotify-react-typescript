import { BsFacebook } from 'react-icons/bs'
import { FaGithub, FaInstagram } from 'react-icons/fa'

export const footerLinks = [
  {
    title: 'Company',
    link: [
      { title: 'About', url: '/' },
      { title: 'Jobs', url: '/' },
      { title: 'For the Record', url: '/' },
    ],
  },
  {
    title: 'Communities',
    link: [
      { title: 'For Artists', url: '/' },
      { title: 'Developers', url: '/' },
      { title: 'Advertising', url: '/' },
      { title: 'Investors', url: '/' },
      { title: 'Vendors', url: '/' },
      { title: 'Spotify for Work', url: '/' },
    ],
  },
  {
    title: 'Useful Links',
    link: [
      { title: 'Support', url: '/' },
      { title: 'Free Mobile App', url: '/' },
    ],
  },
]

export const socialNetworkLinks = [
  {
    title: 'Facebook',
    link: 'https://www.facebook.com/tuan204.dev',
    icon: BsFacebook,
  },
  {
    title: 'Instagram',
    link: 'https://www.instagram.com/tuan204.dev/',
    icon: FaInstagram,
  },
  {
    title: 'Github',
    link: 'https://github.com/tuan204-dev',
    icon: FaGithub,
  },
]

export const siteInfo = [
  { title: 'Legal', url: '/' },
  { title: 'Privacy Center', url: '/' },
  { title: 'Privacy Policy', url: '/' },
  { title: 'Cookies', url: '/' },
  { title: 'About Ads', url: '/' },
  { title: 'Accessibility', url: '/' },
]

export const bottomLinks = [
  {
    title: 'Legal',
    href: 'https://www.spotify.com/vn-en/legal/',
  },
  {
    title: 'Privacy Center',
    href: 'https://www.spotify.com/vn-en/privacy/',
  },
  {
    title: 'Privacy Policy',
    href: 'https://www.spotify.com/vn-en/legal/privacy-policy/',
  },
  {
    title: 'Cookies',
    href: 'https://www.spotify.com/vn-en/legal/cookies-policy/',
  },
  {
    title: 'About Ads',
    href: 'https://www.spotify.com/vn-en/legal/privacy-policy/#s3',
  },
  {
    title: 'Accessibility',
    href: 'https://www.spotify.com/vn-en/accessibility/',
  },
]

export const topLinkGroups = [
  {
    title: 'Company',
    links: [
      {
        title: 'About',
        href: 'https://www.spotify.com/vn-en/about-us/contact/',
        dataAttributes: {
          'data-ga-category': 'menu',
          'data-ga-action': 'about',
        },
      },
      {
        title: 'Jobs',
        href: 'https://www.lifeatspotify.com/',
        dataAttributes: {
          'data-ga-category': 'menu',
          'data-ga-action': 'jobs',
        },
      },
      {
        title: 'For the Record',
        href: 'https://newsroom.spotify.com/',
        dataAttributes: {
          'data-ga-category': 'menu',
          'data-ga-action': 'press',
        },
      },
    ],
  },
  {
    title: 'Communities',
    links: [
      {
        title: 'For Artists',
        href: 'https://artists.spotify.com/',
        dataAttributes: {
          'data-ga-category': 'menu',
          'data-ga-action': 'artists',
        },
      },
      {
        title: 'Developers',
        href: 'https://developer.spotify.com/',
        dataAttributes: {
          'data-ga-category': 'menu',
          'data-ga-action': 'developers',
        },
      },
      {
        title: 'Advertising',
        href: 'https://ads.spotify.com/',
        dataAttributes: {
          'data-ga-category': 'menu',
          'data-ga-action': 'advertising',
        },
      },
      {
        title: 'Investors',
        href: 'https://investors.spotify.com/',
        dataAttributes: {
          'data-ga-category': 'menu',
          'data-ga-action': 'investors',
        },
      },
      {
        title: 'Vendors',
        href: 'https://spotifyforvendors.com/',
        dataAttributes: {
          'data-ga-category': 'menu',
          'data-ga-action': 'vendors',
        },
      },
      {
        title: 'Spotify for Work',
        href: 'https://www.spotify.com/spotifyforwork/',
        dataAttributes: {
          'data-ga-category': 'menu',
          'data-ga-action': 'spotify_for_work',
        },
      },
    ],
  },
  {
    title: 'Useful links',
    links: [
      {
        title: 'Support',
        href: 'https://support.spotify.com/',
        dataAttributes: {
          'data-ga-category': 'menu',
          'data-ga-action': 'help',
        },
      },
      {
        title: 'Web Player',
        href: 'https://open.spotify.com/',
        dataAttributes: {
          'data-ga-category': 'menu',
          'data-ga-action': 'play',
        },
      },
      {
        title: 'Free Mobile App',
        href: 'https://www.spotify.com/vn-en/download/',
        dataAttributes: {
          'data-ga-category': 'menu',
          'data-ga-action': 'free',
        },
      },
    ],
  },
]
