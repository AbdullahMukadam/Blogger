import React from 'react'
import { useDispatch } from 'react-redux'
import {logout} from '../store/AuthSlice'
import authservice from '../Appwrite/auth'
import { FaSignInAlt } from 'react-icons/fa';

function LogoutBtn({className}) {

  const dispatch=useDispatch()

    const handlelogout=()=>{
       authservice.logout().then(()=>{
          dispatch(logout())
       })
    }
  return (
    <div className={`flex items-center ${className} text-black px-1 rounded hover:text-red-800 transition-colors duration-300 mx-4 bg-white`}>
      <FaSignInAlt className="mr-2" />
      <button className='ml-2 outline-none border-none font-bold' onClick={handlelogout}>Logout</button>
    </div>
   
  )
}

export default LogoutBtn