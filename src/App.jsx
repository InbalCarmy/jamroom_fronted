import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'

import { AppHeader } from './cmps/AppHeader'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { MainPage } from './pages/MainPage'
import { LivePage } from './pages/LivePage'
// import { UserMsg } from './cmps/UserMsg'

function App() {

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
