import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/login'
import { ToastContainer} from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL 

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "");
  //storing token in local storage to prevent page  to lose data when reload
  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer></ToastContainer>
      {token === "" ? <Login setToken={setToken}></Login>
        :
        <>
          <Navbar setToken={setToken}></Navbar>
          <hr></hr>
          <div className='flex w-full'>
            <Sidebar></Sidebar>
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path="/add" element={<Add token={token}></Add>}></Route>
                <Route path="/list" element={<List token={token}></List>}></Route>
                <Route path="/orders" element={<Orders token={token}></Orders>}></Route>
              </Routes>
            </div>
          </div>
        </>
      }

    </div>
  )
}

export default App
