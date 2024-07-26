 import { useEffect, useState } from 'react' 
import './App.css'

import { Outlet } from 'react-router-dom'
import authservice from './Appwrite/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/AuthSlice'
import { Navbar,Footer } from './Components'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authservice.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({ userData }))
      } else {
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  }, [])


  return !loading ? (
    <div className="w-screen h-screen bg-gradient-to-r from-slate-900 to-slate-700">
     <div className="w-full h-full">
      <Navbar />
       <Outlet />
      <Footer />
     </div>
    </div>
    ) : null
}

export default App
