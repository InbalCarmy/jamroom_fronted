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
    socketService.on(SOCKET_EVENT_SONG_SELECTED,(data) => {
      const {songId} = data
       if (user) {  // Only navigate if user is logged in
        navigate(`/song/${songId}`)
      }
    })

    socketService.on(SOCKET_EVENT_END_SESSION, () => {
      if (user && !user.isAdmin) {  // Only non-admin users
        navigate('/main')
      }
    })
    return () => {
      socketService.off(SOCKET_EVENT_SONG_SELECTED)
    }
  }, [navigate, user])

  return (
    <>
    <AppHeader/>
    {/* <UserMsg /> */}
    <main>
      <Routes>
        {/* <Route path ="/" element ={<HomePage/>}/> */}
        <Route path ="/" element ={<LoginPage/>}/>
        <Route path ="/Signup" element ={<SignupPage/>}/>
        <Route path ="/main" element ={<MainPage/>}/>
        <Route path ="/song/:id" element ={<LivePage/>}/>
      </Routes>      
    </main>

    </>

  )
}

export default App
