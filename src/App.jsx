import React from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Home from './pages/Home';
import Member from './components/Member';
import NewMember from './components/NewMember';


function App() {
  return (
    <div>
     <Navbar/>

     <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/login' element={<LoginPage/>}/>
       <Route path='/signup' element={<SignupPage/>}/>
       <Route path='/members' element={<Member/>}/>
       <Route path='newmember' element={<NewMember/>}/>
     </Routes>
    </div>
  )
}

export default App
