import { ArtistDataProps } from '../../types'

export default function htmlCleaner(
  htmlString: string | undefined
): ArtistDataProps[] | null {
  if (!htmlString) return null
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')
  const playlists: ArtistDataProps[] = []

  const links = doc.querySelectorAll('a')
  if (links.length === 0) {
    return null
  }

  links.forEach((link) => {
    const name = link.textContent?.trim()
    const href = link.getAttribute('href')
    if (name && href && href.startsWith('spotify:playlist:')) {
      const id = href.split(':')[2]
      playlists.push({ name, id })
    }
  })

  if (playlists.length === 0) {
    return null
  }

  return playlists
}
