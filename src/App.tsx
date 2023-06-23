import Home from './pages/Home/Home'
import Search from './pages/Search/Search'
import Artist from './pages/Artist/Artist'
import Sidebar from './components/Sidebar/Sidebar'
import {
  Routes,
  Route,
  useLocation,
  useSearchParams,
} from 'react-router-dom'
import styles from './App.module.scss'
import Split from 'react-split'
import './resizable.css'
import { useRef } from 'react'
import useComponentSize from './hooks/useComponentSize'
import { MainSizeProvider } from './contexts/MainSizeContext'


function App() {


  return (
    <div className={styles.app}>
      <Split
        sizes={[20, 80]}
        cursor="col-resize"
        minSize={280}
        // maxSize={[600,]}
        gutterSize={8}
        className={styles.split}
      >
        <Sidebar />
        <MainSizeProvider>
          <div className={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/artist" element={<Artist />} />
            </Routes>
          </div>
        </MainSizeProvider>
      </Split>
    </div>
  )
}

export default App
