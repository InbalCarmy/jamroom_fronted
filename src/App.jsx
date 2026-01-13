import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'

import { AppHeader } from './cmps/AppHeader'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'

function App() {

  return (
    <>
    <AppHeader/>
    <Routes>
      {/* <Route path ="/" element ={<HomePage/>}/> */}
      <Route path ="/" element ={<LoginPage/>}/>
      <Route path ="/Signup" element ={<SignupPage/>}/>
    </Routes>
    </>

  )
}

export default App
