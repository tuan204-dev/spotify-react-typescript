import { ArtistData } from '@/types/artist'

export default function htmlCleaner(
  htmlString: string | undefined
): ArtistData[] | null | string {
  if (!htmlString) return null
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')
  const playlists: ArtistData[] = []

  const links = doc.querySelectorAll('a')
  if (links.length === 0) {
    return htmlString
  }

  links.forEach((link) => {
    const name = link.textContent?.trim()
    const href = link.getAttribute('href')
    if (name && href && href.startsWith('spotify:playlist:')) {
      const id = href.split(':')[2]
      playlists.push({ name, id })
    }
  })

  return playlists
}
