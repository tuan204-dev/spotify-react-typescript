import Home from "./pages/Home/Home"
import Search from "./pages/Search/Search"
import Artist from "./pages/Artist/Artist"
import Sidebar from './components/Sidebar/Sidebar'
import {Routes, Route, useLocation, useSearchParams} from 'react-router-dom'
import styles from './App.module.scss'


function App() {
  

  return (
    <div className={styles.app}>
      <Sidebar/>
      <div className={styles.main}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/artist' element={<Artist/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App

