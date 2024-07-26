import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  store  from './store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import {Home,AddPost,Blog,EditPost,HiddenBlogs,LoginPage,ProfilePage,SignupPage,AuthProtector} from "./Components/index.js"
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children:[
      {
        path:"/",
        element: <Home />
      },
      {
        path:"/login",
        element:(
          <AuthProtector authentication={false}>
            <LoginPage />
          </AuthProtector>
          )
      },
      {
        path:"/signup",
        element:(
          <AuthProtector authentication={false}>
            <SignupPage />
          </AuthProtector>
          )
      },
      {
        path:"/add-blog",
        element:(
          <AuthProtector authentication>
            <AddPost />
          </AuthProtector>
          )
      },
      {
        path:"/profile",
        element:(
          <AuthProtector authentication>
            <ProfilePage />
          </AuthProtector>
          )
      },
      {
        path:"/hidden-blog",
        element:(
          <AuthProtector authentication>
            <HiddenBlogs />
          </AuthProtector>
          )
      },
      {
        path:"/edit-post/:slug",
        element:(
          <AuthProtector authentication>
            <EditPost />
          </AuthProtector>
          )
      },
      {
        path:"/post/:slug",
        element:(
          <AuthProtector authentication>
            <Blog />
          </AuthProtector>
        ) 
      },
    ],
  },
  ])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}/>
    <ToastContainer />
  </Provider>,
  </React.StrictMode>,
)
