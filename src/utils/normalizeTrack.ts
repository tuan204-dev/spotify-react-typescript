import { RapidArtistTrack, SpotifyTrack } from '@/types/track'
import { normalizeAlbum } from '.'

const normalizeTrack = (rapidTrack: RapidArtistTrack): SpotifyTrack => {
  return {
    album: normalizeAlbum(rapidTrack?.track?.album),
    artists: rapidTrack?.track?.artists.items.map((item: any) => {
      return { name: item?.profile?.name, id: item?.uri.split(':').pop() }
    }),
    duration_ms: rapidTrack?.track?.duration?.totalMilliseconds,
    name: rapidTrack?.track?.name,
    id: rapidTrack?.track?.id,
  }
}

export default normalizeTrack
