import { Suspense, createContext, lazy, useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoadingLayout from './layouts/LoadingLayout/LoadingLayout'
import Test from './pages/test'
import deleteAllCookies from './utils/deleteAllCookies'
const RootLayout = lazy(() => import('./layouts/RootLayout/RootLayout'))
const Home = lazy(() => import('@/pages/Home/Home'))
const Playlist = lazy(() => import('@/pages/Playlist/Playlist'))
const Album = lazy(() => import('@/pages/Album/Album'))
const Artist = lazy(() => import('@/pages/Artist/Artist'))
const Search = lazy(() => import('@/pages/Search/Search'))
const Section = lazy(() => import('@/pages/Section/Section'))
const Show = lazy(() => import('@/pages/Show/Show'))
const Episode = lazy(() => import('@/pages/Episode/Episode'))
const NotFound = lazy(() => import('@/components/NotFound/NotFound'))
const Queue = lazy(() => import('@/pages/Queue/Queue'))

interface AppContext {
  isPlayingViewShowed: boolean
  setPlayingViewShowed: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = createContext({} as AppContext)

const App = () => {
  const [isPlayingViewShowed, setPlayingViewShowed] = useState<boolean>(false)
  useEffect(() => {
    if (window.innerWidth < 900) {
      alert('Please use a desktop or laptop for the best experience :v')
    }
    deleteAllCookies()
  }, [])

  return (
    <AppContext.Provider value={{ isPlayingViewShowed, setPlayingViewShowed }}>
      <Suspense fallback={<LoadingLayout />}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/search" element={<Search />} />
            <Route path="/section/:id" element={<Section />} />
            <Route path="/artist/:id">
              <Route index element={<Artist />} />
              <Route path="/artist/:id/featuring" element={<Section />} />
              <Route path="/artist/:id/related" element={<Section />} />
              <Route path="/artist/:id/discovered-on" element={<Section />} />
              <Route path="/artist/:id/appears-on" element={<Section />} />
              <Route path="/artist/:id/playlists" element={<Section />} />
            </Route>
            <Route path="/playlist/:id" element={<Playlist />} />
            <Route path="/album/:id" element={<Album />} />
            <Route path="/show/:id" element={<Show />} />
            <Route path="/episode/:id" element={<Episode />} />
            <Route path="/queue" element={<Queue />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AppContext.Provider>
  )
}

export default App
