import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { socketService, SOCKET_EVENT_SONG_SELECTED, SOCKET_EVENT_END_SESSION } from './services/socket.service'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { useSelector } from 'react-redux'

import { AppHeader } from './cmps/AppHeader'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { MainPage } from './pages/MainPage'
import { LivePage } from './pages/LivePage'
// import { UserMsg } from './cmps/UserMsg'

function App() {
  const navigate = useNavigate()
  const user = useSelector(storeState => storeState.userModule.user)

  useEffect(()=> {
    // Listen for song selection
    socketService.on(SOCKET_EVENT_SONG_SELECTED,(data) => {
      const {songId} = data
       if (user) { 
        navigate(`/song/${songId}`)
      }
    })
    // Listen for end session
    socketService.on(SOCKET_EVENT_END_SESSION, () => {
      if (user && !user.isAdmin) { 
        navigate('/main')
      }
    })
    // Listen for current song (when user joins late)
    socketService.on('current-song', (data) => {
      if (user && !user.isAdmin && data.songId) {
        navigate(`/song/${data.songId}`)
      }
    })
    return () => {
      socketService.off(SOCKET_EVENT_SONG_SELECTED)
      socketService.off(SOCKET_EVENT_END_SESSION)
      socketService.off('current-song')
    }
  }, [navigate, user])

  return (
    <>
    <AppHeader/>
    {/* <UserMsg /> */}
    <main>
      <Routes>
        <Route path ="/" element ={<HomePage/>}/>
        <Route path ="/login" element ={<LoginPage/>}/>
        <Route path ="/signup" element ={<SignupPage/>}/>
        <Route path ="/main" element ={<MainPage/>}/>
        <Route path ="/song/:id" element ={<LivePage/>}/>
      </Routes>      
    </main>

    </>

  )
}

export default App
