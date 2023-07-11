import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from './components'
import RootLayout from './layouts/RootLayout/RootLayout'
import Album from './pages/Album/Album'
import Artist from './pages/Artist/Artist'
import Episode from './pages/Episode/Episode'
import Home from './pages/Home/Home'
import Playlist from './pages/Playlist/Playlist'
import Search from './pages/Search/Search'
import Section from './pages/Section/Section'
import Show from './pages/Show/Show'

const App = () => {
  useEffect(() => {
    const clearLocalStorage = () => localStorage.clear()
    window.addEventListener('beforeunload', clearLocalStorage)
    return () => window.removeEventListener('beforeunload', clearLocalStorage)
  }, [])


  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/section/:id" element={<Section />} />
        <Route path="/artist/:id">
          <Route index element={<Artist />} />
          <Route path='/artist/:id/featuring' element={<Section />} />
          <Route path='/artist/:id/related' element={<Section />} />
          <Route path='/artist/:id/discovered-on' element={<Section />} />
          <Route path='/artist/:id/playlists' element={<Section />} />
        </Route>
        <Route path="/playlist/:id" element={<Playlist />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/show/:id" element={<Show />} />
        <Route path="/episode/:id" element={<Episode />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
