import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Split from 'react-split'
import { SkeletonTheme } from 'react-loading-skeleton';
import styles from './App.module.scss'
import Sidebar from './components/Sidebar/Sidebar'
import { MainLayoutProvider } from './contexts/MainLayoutContext'
import Artist from './pages/Artist/Artist'
import Home from './pages/Home/Home'
import Search from './pages/Search/Search'
import './resizable.scss'
import NotFound from './components/NotFound/NotFound'
import Section from './pages/Section/Section';

function App() {
  const { pathname } = useLocation()
  console.log(useLocation())
  const [showSidebar, setShowSidebar] = useState<boolean>(true)

  console.log(pathname)

  useEffect(() => {
    setShowSidebar(['/', '/search', '/artist', '/section'].includes(pathname))
  }, [pathname])
  // console.log(showSidebar, pathname)
  console.log(pathname)

  return (
    <div className={styles.app}>
      <SkeletonTheme baseColor='#333' highlightColor='hsla(0,0%,100%,.1)'>
        <Split
          cursor="col-resize"
          minSize={[280, 500]}
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
                  <Route path="/section" element={<Section />}/>
                  <Route path="/artist" element={<Artist />} />
                </Routes>
              </div>
            ) : (
              <NotFound />
            )}
          </MainLayoutProvider>
        </Split>
      </SkeletonTheme>
    </div>
  )
}

export default App
