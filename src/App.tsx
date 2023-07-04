import { useEffect, useState } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Route, Routes, useLocation } from 'react-router-dom'
import Split from 'react-split'
import styles from './App.module.scss'
import NotFound from './components/NotFound/NotFound'
import Sidebar from './components/Sidebar/Sidebar'
import { MainLayoutProvider } from './contexts/MainLayoutContext'
import Album from './pages/Album/Album'
import Artist from './pages/Artist/Artist'
import Home from './pages/Home/Home'
import Playlist from './pages/Playlist/Playlist'
import Search from './pages/Search/Search'
import Section from './pages/Section/Section'
import './resizable.scss'
import Show from './pages/Show/Show'
import Episode from './pages/Episode/Episode'

function App() {
  const { pathname } = useLocation()
  const [showSidebar, setShowSidebar] = useState<boolean>(true)

  useEffect(() => {
    const clearLocalStorage = () => localStorage.clear()
    window.addEventListener('beforeunload', clearLocalStorage)
    return () => window.removeEventListener('beforeunload', clearLocalStorage)
  }, [])

  useEffect(() => {
    setShowSidebar(
      [
        '/',
        '/search',
        '/artist',
        '/section',
        '/playlist',
        '/album',
        '/show',
        '/episode',
      ].includes(pathname)
    )
  }, [pathname])


  return (
    // <div className={styles.wrapper}>
    <main className={styles.app}>
      <SkeletonTheme baseColor="#333" highlightColor="hsla(0,0%,100%,.1)">
        <Split
          cursor="col-resize"
          minSize={[280, 600]}
          // maxSize={[600, 99999]}
          sizes={[20, 80]}
          className={styles.split}
        >
          {showSidebar && <Sidebar />}
          <MainLayoutProvider>
            {showSidebar ? (
              <div className={styles.main}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/section" element={<Section />} />
                  <Route path="/artist" element={<Artist />} />
                  <Route path="/playlist" element={<Playlist />} />
                  <Route path="/album" element={<Album />} />
                  <Route path="/show" element={<Show />} />
                  <Route path="/episode" element={<Episode />} />
                </Routes>
              </div>
            ) : (
              <NotFound />
            )}
          </MainLayoutProvider>
        </Split>
      </SkeletonTheme>
    </main>
    // </div>
  )
}

export default App
