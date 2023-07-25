import { SpotifyAlbum } from '@/types/album'

const normalizeAlbum = (album: any): SpotifyAlbum => {
  return {
    images: album.coverArt.sources,
    id: album.uri.split(':').pop(),
  }
}

export default normalizeAlbum
